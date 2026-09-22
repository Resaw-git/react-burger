# План: бэкенд для Stellar Burgers (NestJS)

## Цель

Написать с нуля бэкенд на **NestJS + PostgreSQL + TypeORM**, воспроизводящий контракт
оригинального API `stellarburgers.education-services.ru`, чтобы фронтенд работал без
изменений логики — только замена `BASE_URL` / `BASE_WS_URL`.

Контракт API:
- REST: `GET /api/ingredients`, `POST /api/orders`, `POST /api/auth/register`,
  `POST /api/auth/login`, `POST /api/auth/token`, `POST /api/auth/logout`,
  `GET|PATCH /api/auth/user`, `POST /api/password-reset`, `POST /api/password-reset/reset`
- WebSocket: `/orders/all` (общая лента), `/orders?token=` (лента пользователя)
- Формат ответов: `{ success: true, ... }`, ошибки: `{ success: false, message }`
- accessToken выдаётся как `Bearer <jwt>`, живёт 20 минут; при истёкшем — ошибка `"jwt expired"`

## Сделано

### Шаг 1. Инфраструктура
- Nest-проект в `backend/` (Nest 11, TypeScript, strict).
- `docker-compose.yml`: PostgreSQL 16 (порт 5432, БД `stellar_burgers`).
- `.env`: PORT=4000, CORS_ORIGIN, DB_*, JWT_SECRET, JWT_ACCESS_EXPIRES=20m.
- `main.ts`: глобальный префикс `api`, CORS, `ValidationPipe({ whitelist, transform })`.
- `ConfigModule.forRoot({ isGlobal: true })`, TypeORM `autoLoadEntities + synchronize` (dev).

### Шаг 2. Сущности и сид
- `User`: id (uuid), email (unique), name, passwordHash, refreshTokenHash?, resetCode?, timestamps.
- `Ingredient`: id (uuid → маппится в `_id`), name, type (bun|sauce|main), price,
  proteins/fat/carbohydrates/calories, image/image_large/image_mobile.
- `Order`: id (uuid → `_id`), number (int, unique), name, status (done|pending|created),
  ingredients (jsonb string[]), ownerId → User, timestamps.
- `src/database/seed.ts` — 15 ингредиентов, картинки с CDN `code.s3.yandex.net/react/code/...`
  (скрипт `npm run seed`, пропускает, если уже засеяно).

### Шаг 3. Ingredients + формат ответов
- `GET /api/ingredients` → `{ success, data }`, маппинг `id` → `_id`.
- Глобальный `AllExceptionsFilter` (`APP_FILTER`): любая ошибка → `{ success: false, message }`,
  у ValidationPipe-ошибок берётся первое сообщение из массива.

### Шаг 4. AuthModule
- `POST /api/auth/register`, `/login` → `{ success, user, accessToken: "Bearer <jwt>", refreshToken }`.
- `POST /api/auth/token` — ротация refresh; `POST /api/auth/logout` — инвалидация.
- accessToken: JWT (20 мин). refreshToken: случайная hex-строка, в БД хранится bcrypt-хэш,
  logout обнуляет хэш. Ошибки: `401 "email or password are incorrect"`, `401 "Token is invalid"`.
- Пароли — bcrypt (10 раундов). Одинаковое сообщение при «нет пользователя»/«неверный пароль».

### Шаг 5. UsersModule + AuthGuard
- `GET /api/auth/user`, `PATCH /api/auth/user` под `AuthGuard` (токен из заголовка
  `authorization: Bearer ...`).
- Guard различает: истёкший токен → `401 "jwt expired"` (фронт по нему запускает refresh),
  битый/отсутствующий → `401 "Token is invalid"`.
- Наружу возвращаются только `{ email, name }` — хэши не утекают.

### Шаг 6. OrdersModule
- `POST /api/orders` под guard: валидация UUID ингредиентов, проверка их существования (400),
  номер = max+1 (старт с 1000), генерация имени, статус `done`, привязка к владельцу.
- Ответ: `{ success, name, order: { _id, number, name, status, ingredients, createdAt, updatedAt } }`.
- В сервисе также есть `findAll()` / `findByOwner()` / `toResponse()` — для ленты (шаг 7).

### Шаг 6.5. E2E-тесты
- Отдельная БД `stellar_burgers_test`, `.env.test`, `test/jest.setup.ts` (dotenv).
- `test/app.e2e-spec.ts` — 12 тестов: register/login/ошибки, профиль, refresh→logout→reuse,
  ingredients, orders (успех/401/400). Запуск: `npm run test:e2e`.
- Запросы для ручной проверки: `backend/request.http` (REST Client).

## Грабли и важные нюансы (из этой сессии)

1. **Версии пакетов Nest держать на 11.x**: `@nestjs/websockets@^11`, `@nestjs/typeorm@^11`
   (v12 — ESM-only, ломает Jest), `@nestjs/jwt@^11`, `@nestjs/config@^4`.
2. **JwtModule**: `registerAsync({ global: true, ... })` в AuthModule. НЕЛЬЗЯ импортировать
   пустой `JwtModule` в другие модули — создаёт локальный JwtService без секрета, и guard
   отклоняет все токены (`"Token is invalid"` на валидном токене).
3. `tsconfig`: добавлены `strictPropertyInitialization: false`, `useDefineForClassFields: false`
   (иначе TS ругается на поля entity и ломаются декораторы TypeORM при target ES2023).
4. `bcrypt@6` не имеет встроенных типов → `@types/bcrypt` в devDependencies.
5. `expiresIn` в JWT типизирован как `StringValue` из `ms` — нужен каст `as JwtSignOptions['expiresIn']`.
6. ESLint flat config: `defineConfig` из `eslint/config` (не из `jest`! — автодополнение VS Code
   подставляет не тот импорт), глобалы jest и послабления `no-unsafe-*` — только для `test/**`.
7. VS Code: папку `backend` открывать как корень (иначе `.vscode/settings.json` и ESLint-конфиг
   бэкенда не применяются); EditorConfig поддерживается только через расширение.
8. PowerShell: `curl` — алиас на Invoke-WebRequest, использовать `curl.exe`.
9. Исправленные баги: порт БД брался из `DB_HOST` вместо `DB_PORT`; в сиде URL картинок
   потерялся `/` (`react/code` → `react/code/`).

## Осталось

### Шаг 7. WebSocket-лента заказов
- Два gateway на `ws` (не socket.io!): `@WebSocketGateway({ path: '/orders/all' })` и
  `{ path: '/orders' }`. Глобальный префикс `/api` на WS не действует — path задаётся отдельно.
- `/orders/all`: при подключении и при каждом новом заказе отправлять
  `{ success, orders, total, totalToday }` (orders — последние ~50, по убыванию даты;
  total/totalToday — счётчики по статусу done).
- `/orders`: токен из query `?token=` (без `Bearer `, фронт срезает его сам — проверить!);
  невалидный → закрыть сокет. Отправлять заказы только этого пользователя.
- Связка с OrdersService через `exports: [OrdersService]` (уже сделано) и EventEmitter
  (`@nestjs/event-emitter`) или прямой вызов gateway из сервиса после создания заказа.
- Формат заказа в ленте — тот же `toResponse()` (`_id`, ISO-даты).
- E2E-тест: подключение `ws`-клиентом к `/orders/all`, создание заказа через REST →
  в сокет приходит обновлённая лента.

### Шаг 8. PasswordResetModule
- `POST /api/password-reset` `{ email }` → генерировать 6-значный код, сохранять в
  `user.resetCode`, ответ `{ success: true, message: "Reset email sent" }`
  (без реальной отправки email; в dev логировать код в консоль).
- `POST /api/password-reset/reset` `{ password, token }` → сверить код с `resetCode`,
  пересохранить `passwordHash`, обнулить код; неверный код → 400/404
  `{ success: false, message: "Incorrect reset token" }`.
- Покрыть e2e-тестами (код для теста брать напрямую из БД через DataSource).

### Шаг 8.5. Реальная отправка email (регистрация + сброс пароля)

**Технология:** `@nestjs-modules/mailer` (обёртка над nodemailer) + шаблоны писем (handlebars).
Зависимости: `npm i @nestjs-modules/mailer nodemailer`, типы: `npm i -D @types/nodemailer`.

**Почта для проекта (важно про безопасность):**
- Завести ОТДЕЛЬНЫЙ почтовый ящик под проект (не личный!). Подойдет Yandex. (`smtp.yandex.ru:465`, SSL).
- Включить двухфакторку и создать **пароль приложения** (app password) — основной пароль
  ящика в код не кладём никогда. Для Yandex: «Пароли приложений» в настройках безопасности.
- Credentials — только в `.env` (`MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASSWORD`,
  `MAIL_FROM`), файл в `.gitignore`. Для репозитория — `.env.example` с пустыми значениями.
- Альтернатива для разработки без реальной почты: **Mailtrap** (фейковый SMTP, письма
  «приходят» в веб-интерфейс) — удобно тестировать, не засоряя ящик.

**Что меняется в логике:**
1. **Сброс пароля** (`POST /api/password-reset`): вместо логирования кода в консоль —
   отправка письма с 6-значным кодом. Код по-прежнему в `user.resetCode`, плюс добавить
   срок жизни кода (`resetCodeExpiresAt`, 10–15 мин) и инвалидировать после использования.
2. **Регистрация**: после успешной регистрации — welcome-письмо. Контракт API НЕ меняем
   (фронт не ждёт подтверждения email); письмо отправляется «в фоне» — ошибка отправки
   не должна ронять регистрацию (try/catch + лог, или очередь).
3. (Опционально, выходит за контракт фронта) полноценное подтверждение email при
   регистрации с ссылкой — только если готовы дорабатывать и фронт.

**Реализация:**
- `MailModule` (глобальный): конфиг транспорта из `.env` через ConfigService.
- `MailService`: методы `sendWelcome(email, name)`, `sendResetCode(email, code)`.
- Шаблоны писем в `src/mail/templates/` (welcome.hbs, reset-code.hbs).
- Инжект `MailService` в AuthService (welcome) и PasswordResetService (код).
- E2E: в тестах транспорт подменяется заглушкой (`streamTransport`/mock), чтобы письма
  не уходили; проверяем, что метод отправки вызван с правильными данными.

### Шаг 9. Подключение фронтенда
- `src/services/api.ts`: `BASE_URL = http://localhost:4000/api`,
  `BASE_WS_URL = ws://localhost:4000` (лучше через `import.meta.env` с fallback).
- Сквозная проверка в браузере: регистрация → логин → конструктор → заказ (модалка с номером)
  → `/feed` (лента) → `/profile` (данные, редактирование) → `/profile/orders` → refresh
  при истёкшем токене → logout → forgot/reset password.

### Опционально (после MVP) — ✅ всё сделано (детали в конце файла)
- Миграции TypeORM вместо `synchronize: true`.
- Dockerfile для бэкенда + сервис в docker-compose (postgres + backend + frontend).
- Юнит-тесты сервисов (auth.service, orders.service).
- Swagger (`@nestjs/swagger`) на `/api/docs`.
- Rate limiting на auth-эндпоинты, helmet.
- **Redis для refresh-токенов.** Сейчас поиск пользователя по refresh-токену — перебор всех
  пользователей со сравнением bcrypt-хэшей (O(n) на каждый refresh/logout). Правильно:
  хранить в Redis пару `refreshToken → userId` с TTL = времени жизни токена. Плюсы:
  O(1) поиск, автоматическое истечение, простая инвалидация при logout (DEL ключа),
  возможность хранить все активные сессии пользователя (`userId → [tokens]`) и
  разлогинивать «все устройства» одной командой. Заодно Redis пригодится для кэша
  ингредиентов и rate limiting.
- **Refresh token rotation с детектом кражи.** При каждом refresh старый токен сгорает
  (уже сделано), но в проде добавляют: если пришёл уже использованный токен — инвалидировать
  ВСЕ сессии пользователя (признак утечки).

---

## Опционально — что именно сделано (22.09.2026)

1. **Миграции TypeORM.** `src/database/data-source.ts` для CLI (+ `tsconfig.typeorm.json`
   с commonjs для ts-node). Скрипты: `npm run migration:generate|run|revert|create`.
   Начальная миграция `src/database/migrations/1790069777491-initial.ts`
   (+ `CREATE EXTENSION IF NOT EXISTS uuid-ossp` для свежих БД).
   В приложении: `synchronize: false`, `migrationsRun: true` — схема поднимается
   автоматически при старте (включая e2e на пустой `stellar_burgers_test`).
   ⚠️ Существующие БД пересоздавались: `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`
   → `migration:run` → `seed`. Заодно починен `seed.ts` (порт брался из `DB_HOST`).
2. **Docker.** `backend/Dockerfile` (multi-stage node:22-alpine, prod-образ с `npm ci --omit=dev`),
   `frontend/Dockerfile` (vite build → nginx) + `frontend/nginx.conf` (прокси `/api` и WS
   `/orders*` на backend, SPA-fallback). В `docker-compose.yml`: postgres (healthcheck),
   redis (healthcheck), backend (env через environment), frontend (:8080).
   Сид: `docker compose exec backend node dist/database/seed.js`.
3. **Юнит-тесты.** `auth.service.spec.ts` (register/login/refresh/logout + детект кражи),
   `orders.service.spec.ts` (нумерация, имена, валидация, feed), бонусом
   `refresh-token.store.spec.ts` (parseDurationMs + сессии на in-memory сторе).
   Итого 29 тестов, `npm test`.
4. **Swagger.** `@nestjs/swagger@11`, UI на `/api/docs` (`useGlobalPrefix: true`),
   `.addBearerAuth()`, `@ApiTags/@ApiOperation/@ApiResponse/@ApiProperty` на всех
   контроллерах и DTO.
5. **Rate limiting + helmet.** `@nestjs/throttler` глобально (APP_GUARD,
   `THROTTLE_LIMIT=300`/`THROTTLE_TTL_MS=60000`), строже на `/api/auth/*` и
   `/api/password-reset/*` (`THROTTLE_AUTH_LIMIT=20`). `AppThrottlerGuard` пропускает
   WS-контексты. helmet с CSP, ослабленной только под Swagger UI.
   В `.env.test` лимиты задраны (100000), чтобы e2e не упирались в 429.
   Проверено вживую: 20×200 → дальше 429.
6. **Redis для refresh-токенов.** Глобальный `RedisModule`: абстракция `KeyValueStore`,
   прод — `RedisKeyValueStore` (ioredis), при `REDIS_ENABLED=false` — `InMemoryKeyValueStore`
   с TTL (e2e герметичны без Redis). `RefreshTokenStore`: `refresh:{sha256(token)} → userId`
   (TTL `JWT_REFRESH_EXPIRES=30d`), сессии пользователя — set `user-sessions:{userId}`.
   Колонка `users.refreshTokenHash` удалена (вошло в начальную миграцию).
   Бонус: кэш `GET /api/ingredients` (`ingredients:all`, TTL 1ч).
7. **Детект кражи.** При refresh старый токен → `refresh-used:{hash}` (TTL = сроку жизни).
   Повторный приход использованного токена → `revokeAll(userId)`, warn в лог,
   `401 "Token is invalid"` (контракт не менялся). Проверено вживую на Redis: после
   «кражи» отклоняется и старый, и новый токен. Logout отзывает токен БЕЗ метки
   «использован» (не считаем кражей).

Новые env: `JWT_REFRESH_EXPIRES`, `REDIS_ENABLED/HOST/PORT/PASSWORD`,
`THROTTLE_TTL_MS/LIMIT/AUTH_LIMIT`. Шаблон — `.env.example`.
