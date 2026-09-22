import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, TokenDto } from './dto/auth.dto';

// Декораторы вычисляются при импорте модуля — .env к этому моменту уже загружен
// (import 'dotenv/config' первой строкой main.ts, jest.setup.ts для e2e).
const AUTH_THROTTLE = {
  default: {
    limit: Number(process.env.THROTTLE_AUTH_LIMIT ?? 20),
    ttl: Number(process.env.THROTTLE_TTL_MS ?? 60000),
  },
};

@ApiTags('auth')
@Throttle(AUTH_THROTTLE)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь создан, возвращаются токены',
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({
    status: 200,
    description: 'Успешный вход, возвращаются токены',
  })
  @ApiResponse({ status: 401, description: 'email or password are incorrect' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('token')
  @HttpCode(200)
  @ApiOperation({ summary: 'Обновление пары токенов (ротация refresh)' })
  @ApiResponse({ status: 200, description: 'Новая пара токенов' })
  @ApiResponse({ status: 401, description: 'Token is invalid' })
  refresh(@Body() dto: TokenDto) {
    return this.authService.refreshTokens(dto.token);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Выход (инвалидация refresh-токена)' })
  @ApiResponse({ status: 200, description: 'Successful logout' })
  logout(@Body() dto: TokenDto) {
    return this.authService.logout(dto.token);
  }
}
