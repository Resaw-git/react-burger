import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { PasswordResetService } from './password-reset.service';
import { ConfirmResetDto, RequestResetDto } from './dto/password-reset.dto';

const RESET_THROTTLE = {
  default: {
    limit: Number(process.env.THROTTLE_AUTH_LIMIT ?? 20),
    ttl: Number(process.env.THROTTLE_TTL_MS ?? 60000),
  },
};

@ApiTags('password-reset')
@Throttle(RESET_THROTTLE)
@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Запрос кода сброса пароля (письмо на email)' })
  @ApiResponse({ status: 200, description: 'Reset email sent' })
  @ApiResponse({ status: 404, description: 'User with this email not found' })
  confirm(@Body() dto: RequestResetDto) {
    return this.passwordResetService.requestRest(dto.email);
  }

  @Post('reset')
  @HttpCode(200)
  @ApiOperation({ summary: 'Установка нового пароля по коду из письма' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Incorrect reset token' })
  confim(@Body() dto: ConfirmResetDto) {
    return this.passwordResetService.confirmReset(dto.password, dto.token);
  }
}
