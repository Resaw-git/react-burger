import { ConfigService } from '@nestjs/config';
import { parseDurationMs, RefreshTokenStore } from './refresh-token.store';
import { InMemoryKeyValueStore } from '../redis/in-memory.store';

describe('parseDurationMs', () => {
  it.each([
    ['500ms', 500],
    ['30s', 30_000],
    ['15m', 900_000],
    ['12h', 43_200_000],
    ['30d', 2_592_000_000],
  ])('"%s" → %i мс', (input, expected) => {
    expect(parseDurationMs(input)).toBe(expected);
  });

  it('бросает ошибку на некорректном формате', () => {
    expect(() => parseDurationMs('soon')).toThrow();
  });
});

describe('RefreshTokenStore (на in-memory хранилище)', () => {
  let store: RefreshTokenStore;

  beforeEach(() => {
    const config = {
      get: jest.fn().mockReturnValue('30d'),
    } as unknown as ConfigService;
    store = new RefreshTokenStore(new InMemoryKeyValueStore(), config);
  });

  it('сохраняет токен и находит владельца', async () => {
    await store.save('token-1', 'user-1');

    await expect(store.resolve('token-1')).resolves.toEqual({
      userId: 'user-1',
      reused: false,
    });
  });

  it('неизвестный токен → null', async () => {
    await expect(store.resolve('nope')).resolves.toBeNull();
  });

  it('ротация: старый токен помечается как использованный', async () => {
    await store.save('token-1', 'user-1');
    await store.rotateOut('token-1');

    await expect(store.resolve('token-1')).resolves.toEqual({
      userId: 'user-1',
      reused: true,
    });
  });

  it('revoke (logout): токен исчезает без пометки об использовании', async () => {
    await store.save('token-1', 'user-1');
    await store.revoke('token-1');

    await expect(store.resolve('token-1')).resolves.toBeNull();
  });

  it('revokeAll отзывает все сессии пользователя', async () => {
    await store.save('token-1', 'user-1');
    await store.save('token-2', 'user-1');
    await store.save('token-3', 'user-2');

    const revoked = await store.revokeAll('user-1');

    expect(revoked).toBe(2);
    await expect(store.resolve('token-1')).resolves.toBeNull();
    await expect(store.resolve('token-2')).resolves.toBeNull();
    // чужая сессия не тронута
    await expect(store.resolve('token-3')).resolves.toEqual({
      userId: 'user-2',
      reused: false,
    });
  });

  it('один пользователь может иметь несколько активных сессий', async () => {
    await store.save('token-1', 'user-1');
    await store.save('token-2', 'user-1');

    await expect(store.resolve('token-1')).resolves.toMatchObject({
      reused: false,
    });
    await expect(store.resolve('token-2')).resolves.toMatchObject({
      reused: false,
    });
  });
});
