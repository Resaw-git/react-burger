import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { KeyValueStore } from '../redis/key-value-store';

/** Парсит строки вида "30d", "12h", "15m", "30s", "500ms" в миллисекунды. */
export function parseDurationMs(value: string): number {
  const match = /^(\d+)\s*(ms|s|m|h|d)$/.exec(value.trim());
  if (!match) {
    throw new Error(
      `Некорректная длительность: "${value}". Ожидается, например, "30d", "12h", "15m".`,
    );
  }
  const amount = Number(match[1]);
  const multipliers: Record<string, number> = {
    ms: 1,
    s: 1_000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };
  return amount * multipliers[match[2]];
}

export interface ResolvedRefreshToken {
  userId: string;
  /** true — токен уже был ротирован (признак кражи при повторном использовании). */
  reused: boolean;
}

/**
 * Хранилище refresh-токенов в KeyValueStore (Redis).
 *
 * Ключи:
 * - `refresh:{sha256(token)}` → userId, TTL = время жизни токена (активные токены);
 * - `refresh-used:{sha256(token)}` → userId, TTL = время жизни токена
 *   (уже ротированные — для детекта кражи);
 * - `user-sessions:{userId}` → set хэшей активных токенов пользователя
 *   (инвалидация всех сессий разом).
 *
 * Сами токены не хранятся — только sha256-хэши.
 */
@Injectable()
export class RefreshTokenStore {
  private readonly ttlMs: number;

  constructor(
    private readonly kv: KeyValueStore,
    config: ConfigService,
  ) {
    this.ttlMs = parseDurationMs(
      config.get<string>('JWT_REFRESH_EXPIRES') ?? '30d',
    );
  }

  /** Сохраняет новый refresh-токен (выдача при логине/регистрации/ротации). */
  async save(token: string, userId: string): Promise<void> {
    const hash = this.hashToken(token);
    await this.kv.set(this.activeKey(hash), userId, this.ttlMs);
    await this.kv.sadd(this.sessionsKey(userId), hash);
    await this.kv.expire(this.sessionsKey(userId), this.ttlMs);
  }

  /**
   * Ищет токен среди активных и уже использованных.
   * null — токен неизвестен (истёк или поддельный).
   */
  async resolve(token: string): Promise<ResolvedRefreshToken | null> {
    const hash = this.hashToken(token);
    const activeUserId = await this.kv.get(this.activeKey(hash));
    if (activeUserId) return { userId: activeUserId, reused: false };
    const usedUserId = await this.kv.get(this.usedKey(hash));
    if (usedUserId) return { userId: usedUserId, reused: true };
    return null;
  }

  /**
   * Ротация: активный токен становится недействительным и помечается как
   * использованный. Повторное обращение с ним будет распознано как кража.
   */
  async rotateOut(token: string): Promise<void> {
    const hash = this.hashToken(token);
    const userId = await this.kv.get(this.activeKey(hash));
    if (!userId) return;
    await this.kv.del(this.activeKey(hash));
    await this.kv.srem(this.sessionsKey(userId), hash);
    await this.kv.set(this.usedKey(hash), userId, this.ttlMs);
  }

  /** Отзывает токен без пометки «использован» (logout). */
  async revoke(token: string): Promise<void> {
    const hash = this.hashToken(token);
    const userId = await this.kv.get(this.activeKey(hash));
    await this.kv.del(this.activeKey(hash));
    if (userId) await this.kv.srem(this.sessionsKey(userId), hash);
  }

  /** Отзывает ВСЕ refresh-сессии пользователя. Возвращает число отозванных токенов. */
  async revokeAll(userId: string): Promise<number> {
    const sessionsKey = this.sessionsKey(userId);
    const hashes = await this.kv.smembers(sessionsKey);
    if (hashes.length) {
      await this.kv.del(...hashes.map((hash) => this.activeKey(hash)));
    }
    await this.kv.del(sessionsKey);
    return hashes.length;
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private activeKey(hash: string): string {
    return `refresh:${hash}`;
  }

  private usedKey(hash: string): string {
    return `refresh-used:${hash}`;
  }

  private sessionsKey(userId: string): string {
    return `user-sessions:${userId}`;
  }
}
