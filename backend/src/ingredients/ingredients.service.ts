import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredients.entity';
import { KeyValueStore } from '../redis/key-value-store';

const CACHE_KEY = 'ingredients:all';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 час

@Injectable()
export class IngredientsService {
  private readonly logger = new Logger(IngredientsService.name);

  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientsRepository: Repository<Ingredient>,
    private readonly kv: KeyValueStore,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    const cached = await this.kv.get(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached) as Ingredient[];
    }

    const ingredients = await this.ingredientsRepository.find();
    await this.kv
      .set(CACHE_KEY, JSON.stringify(ingredients), CACHE_TTL_MS)
      .catch((err: Error) =>
        this.logger.warn(`Не удалось закэшировать ингредиенты: ${err.message}`),
      );
    return ingredients;
  }

  async findByIds(ids: string[]): Promise<Ingredient[]> {
    if (!ids.length) return [];
    return this.ingredientsRepository
      .createQueryBuilder('ingredient')
      .where('ingredient.id IN (:...ids)', { ids })
      .getMany();
  }
}
