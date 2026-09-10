import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Ingredient } from '../src/ingredients/ingredients.entity';

describe('Stellar Burgers API (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let accessToken: string;
  let refreshToken: string;
  let bunId: string;
  let mainId: string;

  const user = {
    name: 'E2E User',
    email: 'e2e@test.ru',
    password: '123456',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();

    dataSource = moduleRef.get(DataSource);

    // чистая БД + тестовые ингредиенты
    await dataSource.query('TRUNCATE orders, users, ingredients CASCADE');
    const repo = dataSource.getRepository(Ingredient);
    const bun = await repo.save(
      repo.create({
        name: 'Тестовая булка',
        type: 'bun',
        price: 100,
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        image: 'img',
        image_large: 'img_l',
        image_mobile: 'img_m',
      }),
    );
    const main = await repo.save(
      repo.create({
        name: 'Тестовая начинка',
        type: 'main',
        price: 200,
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        image: 'img',
        image_large: 'img_l',
        image_mobile: 'img_m',
      }),
    );
    bunId = bun.id;
    mainId = main.id;
  });

  afterAll(async () => {
    await app.close();
  });

  const http = () => request(app.getHttpServer());

  describe('POST /api/auth/register', () => {
    it('регистрирует пользователя и возвращает токены', async () => {
      const res = await http().post('/api/auth/register').send(user);

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toEqual({ email: user.email, name: user.name });
      expect(res.body.accessToken).toMatch(/^Bearer /);
      expect(res.body.refreshToken).toBeDefined();
    });

    it('отклоняет невалидные данные', async () => {
      const res = await http()
        .post('/api/auth/register')
        .send({ name: '', email: 'not-an-email', password: '1' });

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('логинит и возвращает токены', async () => {
      const res = await http()
        .post('/api/auth/login')
        .send({ email: user.email, password: user.password });

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.success).toBe(true);

      accessToken = res.body.accessToken;
      refreshToken = res.body.refreshToken;
    });

    it('возвращает 401 при неверном пароле', async () => {
      const res = await http()
        .post('/api/auth/login')
        .send({ email: user.email, password: 'wrong' });

      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body).toEqual({
        success: false,
        message: 'email or password are incorrect',
      });
    });
  });

  describe('GET /api/auth/user', () => {
    it('возвращает профиль по токену', async () => {
      const res = await http()
        .get('/api/auth/user')
        .set('authorization', accessToken);

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.user).toEqual({ email: user.email, name: user.name });
    });

    it('возвращает 401 без токена', async () => {
      const res = await http().get('/api/auth/user');

      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(res.body.message).toBe('Token is invalid');
    });
  });

  describe('PATCH /api/auth/user', () => {
    it('обновляет имя', async () => {
      const res = await http()
        .patch('/api/auth/user')
        .set('authorization', accessToken)
        .send({ name: 'Updated Name' });

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.user.name).toBe('Updated Name');
    });
  });

  describe('refresh/logout', () => {
    it('обновляет токены по refreshToken', async () => {
      const res = await http()
        .post('/api/auth/token')
        .send({ token: refreshToken });

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.accessToken).toMatch(/^Bearer /);

      accessToken = res.body.accessToken;
      refreshToken = res.body.refreshToken;
    });

    it('logout инвалидирует refreshToken', async () => {
      const logout = await http()
        .post('/api/auth/logout')
        .send({ token: refreshToken });
      expect(logout.body.success).toBe(true);

      const reuse = await http()
        .post('/api/auth/token')
        .send({ token: refreshToken });
      expect(reuse.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(reuse.body.message).toBe('Token is invalid');
    });
  });

  describe('GET /api/ingredients', () => {
    it('возвращает список в формате фронта', async () => {
      const res = await http().get('/api/ingredients');

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0]).toHaveProperty('_id');
      expect(res.body.data[0]).not.toHaveProperty('id');
    });
  });

  describe('POST /api/orders', () => {
    it('создаёт заказ авторизованному пользователю', async () => {
      // перелогин после logout
      const login = await http()
        .post('/api/auth/login')
        .send({ email: user.email, password: user.password });
      accessToken = login.body.accessToken;

      const res = await http()
        .post('/api/orders')
        .set('authorization', accessToken)
        .send({ ingredients: [bunId, mainId, bunId] });

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.success).toBe(true);
      expect(res.body.order.number).toBe(1000);
      expect(res.body.order.ingredients).toEqual([bunId, mainId, bunId]);
    });

    it('возвращает 401 без токена', async () => {
      const res = await http()
        .post('/api/orders')
        .send({ ingredients: [bunId] });

      expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('возвращает 400 на несуществующий ингредиент', async () => {
      const res = await http()
        .post('/api/orders')
        .set('authorization', accessToken)
        .send({ ingredients: ['123e4567-e89b-42d3-a456-426614174000'] });

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.success).toBe(false);
    });
  });
});
