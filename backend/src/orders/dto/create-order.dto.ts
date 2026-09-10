import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  ingredients: string[];
}
