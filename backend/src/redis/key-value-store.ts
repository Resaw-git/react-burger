export abstract class KeyValueStore {
  abstract get(key: string): Promise<string | null>;
  abstract set(key: string, value: string, ttlMs?: number): Promise<void>;
  abstract del(...keys: string[]): Promise<void>;
  abstract sadd(key: string, ...members: string[]): Promise<void>;
  abstract smembers(key: string): Promise<string[]>;
  abstract srem(key: string, ...members: string[]): Promise<void>;
  abstract expire(key: string, ttlMs: number): Promise<void>;
}
