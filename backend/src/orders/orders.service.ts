import { BadRequestException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { IngredientsService } from '../ingredients/ingredients.service';
import { ORDER_CREATED, ORDER_EVENTS } from '../common/events/events.module';
import EventEmitter from 'events';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @Inject(ORDER_EVENTS)
    private readonly events: EventEmitter,
    private readonly ingredientsService: IngredientsService,
  ) {}

  async create(ownerId: string, ingredientIds: string[]) {
    const found = await this.ingredientsService.findByIds(ingredientIds);
    const foundIds = new Set(found.map((item) => item.id));
    const unknown = ingredientIds.filter((id) => !foundIds.has(id));
    if (unknown.length > 0) {
      throw new BadRequestException('One or more ingredients are invalid');
    }

    const result = await this.ordersRepository
      .createQueryBuilder('order')
      .select('MAX(order.number)', 'max')
      .getRawOne<{ max: number | null }>();

    const max = result?.max != null ? Number(result.max) : null;
    const number = (max ?? 999) + 1;

    const order = this.ordersRepository.create({
      number,
      name: this.generateName(found.map((item) => item.name)),
      status: 'done',
      ingredients: ingredientIds,
      ownerId,
    });
    await this.ordersRepository.save(order);
    this.events.emit(ORDER_CREATED);

    return {
      success: true,
      name: order.name,
      order: this.toResponse(order),
    };
  }

  public async getFeed(ownerId?: string) {
    const where = ownerId ? { ownerId } : {};
    const orders = await this.ordersRepository.find({
      where,
      order: { createdAt: 'DESC' },
      take: 50,
    });

    const total = await this.ordersRepository.count({ where });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const totalToday = await this.ordersRepository.count({
      where: { ...where, createdAt: MoreThanOrEqual(todayStart) },
    });

    return {
      success: true,
      orders: orders.map((order) => this.toResponse(order)),
      total,
      totalToday,
    };
  }

  public async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ order: { createdAt: 'DESC' } });
  }

  public async findByOwner(ownerId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  public toResponse(order: Order) {
    return {
      _id: order.id,
      number: order.number,
      name: order.name,
      status: order.status,
      ingredients: order.ingredients,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  }

  private generateName(ingredientNames: string[]): string {
    const main =
      ingredientNames.find((name) => !name.includes('булка')) ?? 'Космический';
    return `${main} бургер`;
  }
}
