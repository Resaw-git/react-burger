import { Injectable } from '@nestjs/common';
import { KeyValueStore } from './key-value-store';

interface StringEntry {
  value: string;
  expiresAt: number | null;
}

interface SetEntry {
  members: Set<string>;
  expiresAt: number | null;
}

@Injectable()
export class InMemoryKeyValueStore extends KeyValueStore {
  private readonly strings = new Map<string, StringEntry>();
  private readonly sets = new Map<string, SetEntry>();

  private isExpired(expiresAt: number | null): boolean {
    return expiresAt !== null && expiresAt <= Date.now();
  }

  private getStringEntry(key: string): StringEntry | undefined {
    const entry = this.strings.get(key);
    if (entry && this.isExpired(entry.expiresAt)) {
      this.strings.delete(key);
      return undefined;
    }
    return entry;
  }

  private getSetEntry(key: string): SetEntry | undefined {
    const entry = this.sets.get(key);
    if (entry && this.isExpired(entry.expiresAt)) {
      this.sets.delete(key);
      return undefined;
    }
    return entry;
  }

  get(key: string): Promise<string | null> {
    return Promise.resolve(this.getStringEntry(key)?.value ?? null);
  }

  set(key: string, value: string, ttlMs?: number): Promise<void> {
    this.strings.set(key, {
      value,
      expiresAt: ttlMs ? Date.now() + ttlMs : null,
    });
    return Promise.resolve();
  }

  del(...keys: string[]): Promise<void> {
    for (const key of keys) {
      this.strings.delete(key);
      this.sets.delete(key);
    }
    return Promise.resolve();
  }

  sadd(key: string, ...members: string[]): Promise<void> {
    if (!members.length) return Promise.resolve();
    let entry = this.getSetEntry(key);
    if (!entry) {
      entry = { members: new Set(), expiresAt: null };
      this.sets.set(key, entry);
    }
    for (const member of members) entry.members.add(member);
    return Promise.resolve();
  }

  smembers(key: string): Promise<string[]> {
    return Promise.resolve([...(this.getSetEntry(key)?.members ?? [])]);
  }

  srem(key: string, ...members: string[]): Promise<void> {
    const entry = this.getSetEntry(key);
    if (entry) {
      for (const member of members) entry.members.delete(member);
    }
    return Promise.resolve();
  }

  expire(key: string, ttlMs: number): Promise<void> {
    const expiresAt = Date.now() + ttlMs;
    const stringEntry = this.getStringEntry(key);
    if (stringEntry) stringEntry.expiresAt = expiresAt;
    const setEntry = this.getSetEntry(key);
    if (setEntry) setEntry.expiresAt = expiresAt;
    return Promise.resolve();
  }
}
