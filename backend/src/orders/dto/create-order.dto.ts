import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'UUID ингредиентов заказа',
    example: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  ingredients: string[];
}
