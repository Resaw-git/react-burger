import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KeyValueStore } from './key-value-store';
import { InMemoryKeyValueStore } from './in-memory.store';
import { RedisKeyValueStore } from './redis.store';

@Global()
@Module({
  providers: [
    {
      provide: KeyValueStore,
      inject: [ConfigService],
      useFactory: (config: ConfigService): KeyValueStore => {
        const logger = new Logger('RedisModule');
        if (config.get<string>('REDIS_ENABLED') === 'true') {
          const host = config.get<string>('REDIS_HOST') ?? 'localhost';
          const port = Number(config.get<string>('REDIS_PORT') ?? 6379);
          const password = config.get<string>('REDIS_PASSWORD');
          logger.log(`Redis-хранилище: ${host}:${port}`);
          return new RedisKeyValueStore(host, port, password);
        }
        logger.warn('REDIS_ENABLED=false — используется in-memory хранилище');
        return new InMemoryKeyValueStore();
      },
    },
  ],
  exports: [KeyValueStore],
})
export class RedisModule {}
