import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, TokenDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('token')
  @HttpCode(200)
  refresh(@Body() dto: TokenDto) {
    return this.authService.refreshTokens(dto.token);
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Body() dto: TokenDto) {
    return this.authService.logout(dto.token);
  }
}
