import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredients.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientsRepository: Repository<Ingredient>,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsRepository.find();
  }

  async findByIds(ids: string[]): Promise<Ingredient[]> {
    if (!ids.length) return [];
    return this.ingredientsRepository
      .createQueryBuilder('ingredient')
      .where('ingredient.id IN (:...ids)', { ids })
      .getMany();
  }
}
