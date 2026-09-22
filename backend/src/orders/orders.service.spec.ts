import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventEmitter } from 'events';
import { OrdersService } from './orders.service';
import { IngredientsService } from '../ingredients/ingredients.service';
import { Ingredient } from '../ingredients/ingredients.entity';
import { Order } from './orders.entity';
import { ORDER_CREATED } from '../common/events/events.module';

describe('OrdersService', () => {
  let service: OrdersService;
  let ordersRepository: {
    createQueryBuilder: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    count: jest.Mock;
  };
  let ingredientsService: { findByIds: jest.Mock };
  let events: EventEmitter;
  let emitSpy: jest.SpyInstance;
  let getRawOne: jest.Mock;

  const bun: Ingredient = {
    id: '11111111-1111-4111-8111-111111111111',
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
  };
  const main: Ingredient = {
    ...bun,
    id: '22222222-2222-4222-8222-222222222222',
    name: 'Космическая котлета',
    type: 'main',
  };

  beforeEach(() => {
    getRawOne = jest.fn().mockResolvedValue({ max: null });
    ordersRepository = {
      createQueryBuilder: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getRawOne,
      }),
      create: jest.fn().mockImplementation((data: Partial<Order>) => ({
        ...data,
        id: 'order-uuid',
        createdAt: new Date('2026-01-01T10:00:00Z'),
        updatedAt: new Date('2026-01-01T10:00:00Z'),
      })),
      save: jest.fn().mockImplementation((o: Order) => Promise.resolve(o)),
      find: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
    };
    ingredientsService = {
      findByIds: jest.fn().mockResolvedValue([bun, main]),
    };
    events = new EventEmitter();
    emitSpy = jest.spyOn(events, 'emit');

    service = new OrdersService(
      ordersRepository as unknown as Repository<Order>,
      events,
      ingredientsService as unknown as IngredientsService,
    );
  });

  describe('create', () => {
    it('создаёт заказ с номером 1000, когда заказов ещё нет', async () => {
      const result = await service.create('owner-1', [bun.id, main.id]);

      expect(ordersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          number: 1000,
          status: 'done',
          ownerId: 'owner-1',
          ingredients: [bun.id, main.id],
        }),
      );
      expect(result.success).toBe(true);
      expect(result.order.number).toBe(1000);
      expect(result.order._id).toBe('order-uuid');
      expect(result.order.createdAt).toBe('2026-01-01T10:00:00.000Z');
    });

    it('инкрементирует номер от текущего максимума', async () => {
      getRawOne.mockResolvedValue({ max: '4242' });

      const result = await service.create('owner-1', [bun.id]);

      expect(result.order.number).toBe(4243);
    });

    it('генерирует имя из первого ингредиента не-булки', async () => {
      const result = await service.create('owner-1', [bun.id, main.id]);

      expect(result.name).toBe('Космическая котлета бургер');
    });

    it('эмитит событие order.created для WebSocket-ленты', async () => {
      await service.create('owner-1', [bun.id]);

      expect(emitSpy).toHaveBeenCalledWith(ORDER_CREATED);
    });

    it('400 на несуществующий ингредиент', async () => {
      ingredientsService.findByIds.mockResolvedValue([bun]);

      await expect(
        service.create('owner-1', [bun.id, main.id]),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(ordersRepository.save).not.toHaveBeenCalled();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('getFeed', () => {
    it('возвращает заказы и счётчики', async () => {
      const order = {
        id: 'o1',
        number: 1000,
        name: 'Тест',
        status: 'done',
        ingredients: [],
        ownerId: 'u1',
        createdAt: new Date('2026-01-01T10:00:00Z'),
        updatedAt: new Date('2026-01-01T10:00:00Z'),
      } as unknown as Order;
      ordersRepository.find.mockResolvedValue([order]);
      ordersRepository.count.mockResolvedValueOnce(10).mockResolvedValueOnce(3);

      const feed = await service.getFeed();

      expect(feed).toMatchObject({ success: true, total: 10, totalToday: 3 });
      expect(feed.orders[0]._id).toBe('o1');
      expect(ordersRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 50 }),
      );
    });

    it('фильтрует по владельцу', async () => {
      await service.getFeed('owner-42');

      expect(ordersRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ where: { ownerId: 'owner-42' } }),
      );
    });
  });
});
