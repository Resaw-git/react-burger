import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Ivan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ivan@example.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'ivan@example.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class TokenDto {
  @ApiProperty({ description: 'Refresh-токен, полученный при логине' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
