import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredients.entity';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @ApiOperation({ summary: 'Список ингредиентов' })
  @ApiResponse({ status: 200, description: '{ success, data: Ingredient[] }' })
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
