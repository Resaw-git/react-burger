# Stellar Burgers — Backend

Бэкенд на **NestJS + PostgreSQL + TypeORM + Redis**, воспроизводящий контракт API
`stellarburgers.education-services.ru` (REST + WebSocket-лента заказов).

## Быстрый старт (локально)

```bash
docker compose up -d postgres redis   # инфраструктура
cp .env.example .env                  # заполнить JWT_SECRET и при необходимости MAIL_*
npm ci
npm run migration:run                 # создать схему БД
npm run seed                          # 15 ингредиентов (одноразово)
npm run start                         # http://localhost:4000
```

- Swagger UI: **http://localhost:4000/api/docs**
- WebSocket: `ws://localhost:4000/orders/all` (общая лента), `ws://localhost:4000/orders?token=<accessToken>` (лента пользователя)

## Docker (весь стек)

```bash
docker compose up -d --build          # postgres + redis + backend + frontend (nginx)
docker compose exec backend node dist/database/seed.js   # засеять ингредиенты
```

Фронтенд доступен на http://localhost:8080 (nginx проксирует `/api` и WS `/orders*` на backend).

## Тесты

```bash
npm test            # юнит-тесты (auth.service, orders.service, refresh-token.store)
npm run test:e2e    # e2e против stellar_burgers_test (схема поднимается миграциями)
```

## Миграции

```bash
npm run migration:generate -- src/database/migrations/<name>  # по изменениям entities
npm run migration:run
npm run migration:revert
```

`synchronize` выключен — схема управляется миграциями (`migrationsRun: true` при старте приложения).

## Переменные окружения

См. `.env.example`. Ключевые:

- `JWT_ACCESS_EXPIRES=20m`, `JWT_REFRESH_EXPIRES=30d` — время жизни токенов.
- `REDIS_ENABLED=true|false` — хранилище refresh-токенов и кэша ингредиентов
  (false → in-memory, для e2e/локальной разработки без Redis).
- `THROTTLE_LIMIT` / `THROTTLE_AUTH_LIMIT` / `THROTTLE_TTL_MS` — rate limiting
  (глобальный и для auth/password-reset эндпоинтов).
- `MAIL_ENABLED` + `MAIL_*` — отправка писем (welcome + код сброса пароля).

## Refresh-токены: хранение и защита от кражи

Токены хранятся в Redis: `refresh:{sha256(token)} → userId` с TTL. При каждом
обновлении токен ротируется: старый помечается `refresh-used:` (на весь срок его
жизни). Если уже использованный токен приходит повторно — это признак утечки:
все сессии пользователя инвалидируются (`user-sessions:{userId}`), клиент получает
`401 "Token is invalid"` и должен залогиниться заново.
