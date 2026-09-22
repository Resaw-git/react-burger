import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import type { IRequestWithUser } from '../auth/guards/auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('auth/user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить профиль текущего пользователя' })
  @ApiResponse({
    status: 200,
    description: '{ success, user: { email, name } }',
  })
  @ApiResponse({ status: 401, description: 'jwt expired / Token is invalid' })
  getUser(@Req() req: IRequestWithUser) {
    return this.userService.getProfile(req.user.sub);
  }

  @Patch()
  @ApiOperation({ summary: 'Обновить имя и/или email' })
  @ApiResponse({ status: 200, description: 'Обновлённый профиль' })
  @ApiResponse({ status: 401, description: 'jwt expired / Token is invalid' })
  updateUser(@Req() req: IRequestWithUser, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.sub, dto);
  }
}
