import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AddressInfo } from 'net';
import WebSocket, { RawData } from 'ws';
import { AppModule } from '../src/app.module';
import { Ingredient } from '../src/ingredients/ingredients.entity';
import { Server } from 'http';

interface IFeedMessage {
  success: boolean;
  orders: Array<{ _id: string; number: number; ingredients: string[] }>;
  total: number;
  totalToday: number;
}

describe('Feed WebSocket (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let bunId: string;
  let baseWs: string;
  const sockets: WebSocket[] = [];

  const user = { name: 'WS User', email: 'ws@test.ru', password: '123456' };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter(app));
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.listen(0);

    const server = app.getHttpServer() as Server;
    const { port } = server.address() as AddressInfo;
    baseWs = `ws://localhost:${port}`;

    const dataSource = moduleRef.get(DataSource);
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
    bunId = bun.id;

    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(user);

    accessToken = res.body.accessToken as string;
  });

  afterAll(async () => {
    sockets.forEach((socket) => socket.close());
    await app.close();
  });

  const rawToString = (data: RawData): string => {
    if (Array.isArray(data)) {
      return Buffer.concat(data).toString('utf-8');
    }
    if (Buffer.isBuffer(data)) {
      return data.toString('utf-8');
    }

    return Buffer.from(data).toString('utf-8');
  };

  const waitForMessage = (
    socket: WebSocket,
    timeoutMs = 5000,
  ): Promise<IFeedMessage> =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error('WS message timeout')),
        timeoutMs,
      );
      socket.once('message', (data: RawData) => {
        clearTimeout(timer);
        resolve(JSON.parse(rawToString(data)) as IFeedMessage);
      });
    });

  const connect = (path: string): WebSocket => {
    const socket = new WebSocket(`${baseWs}${path}`);
    sockets.push(socket);
    return socket;
  };

  it('/orders/all отправка ленты при подключении', async () => {
    const socket = connect('/orders/all');
    const feed = await waitForMessage(socket);

    expect(feed.success).toBe(true);
    expect(Array.isArray(feed.orders)).toBe(true);
    expect(feed.total).toBe(0);
    expect(feed.totalToday).toBe(0);
  });

  it('/orders/all получение обновления при создании заказа', async () => {
    const socket = connect('/orders/all');
    await waitForMessage(socket);

    const updated = waitForMessage(socket);
    await request(app.getHttpServer())
      .post('/api/orders')
      .set('authorization', accessToken)
      .send({ ingredients: [bunId] });

    const feed = await updated;
    expect(feed.total).toBe(1);
    expect(feed.totalToday).toBe(1);
    expect(feed.orders[0].number).toBe(1000);
    expect(feed.orders[0].ingredients).toEqual([bunId]);
  });

  it('/orders?token= с префиксом Bearer тоже работает', async () => {
    const socket = connect(`/orders?token=${encodeURIComponent(accessToken)}`);
    const feed = await waitForMessage(socket);

    expect(feed.success).toBe(true);
  });

  it('/orders с невалидным токеном закрывает соединение с кодом 1008', async () => {
    const socket = connect('/orders?token=garbage');

    const code = await new Promise<number>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('close timeout')), 5000);
      socket.once('close', (closeCode: number) => {
        clearTimeout(timer);
        resolve(closeCode);
      });
    });

    expect(code).toBe(1008);
  });
});
