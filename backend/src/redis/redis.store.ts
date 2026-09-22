import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { KeyValueStore } from './key-value-store';

@Injectable()
export class RedisKeyValueStore
  extends KeyValueStore
  implements OnModuleDestroy
{
  private readonly client: Redis;

  constructor(host: string, port: number, password?: string) {
    super();
    this.client = new Redis({
      host,
      port,
      password: password || undefined,
      maxRetriesPerRequest: 3,
    });
  }

  get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlMs?: number): Promise<void> {
    if (ttlMs) {
      await this.client.set(key, value, 'PX', ttlMs);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(...keys: string[]): Promise<void> {
    if (keys.length) await this.client.del(...keys);
  }

  async sadd(key: string, ...members: string[]): Promise<void> {
    if (members.length) await this.client.sadd(key, ...members);
  }

  smembers(key: string): Promise<string[]> {
    return this.client.smembers(key);
  }

  async srem(key: string, ...members: string[]): Promise<void> {
    if (members.length) await this.client.srem(key, ...members);
  }

  async expire(key: string, ttlMs: number): Promise<void> {
    await this.client.pexpire(key, ttlMs);
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}
