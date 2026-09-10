import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredients.entity';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async getAll() {
    const ingredients = await this.ingredientsService.findAll();
    return {
      success: true,
      data: ingredients.map((ingredient) => this.toResponse(ingredient)),
    };
  }

  private toResponse(ingredient: Ingredient) {
    const { id, ...rest } = ingredient;
    return { _id: id, ...rest };
  }
}
