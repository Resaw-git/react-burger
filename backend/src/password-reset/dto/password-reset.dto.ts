import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RequestResetDto {
  @ApiProperty({ example: 'ivan@example.ru' })
  @IsEmail()
  email: string;
}

export class ConfirmResetDto {
  @ApiProperty({ example: 'new-password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: '6-значный код из письма', example: '123456' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
