import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import type { IRequestWithUser } from '../auth/guards/auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth/user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUser(@Req() req: IRequestWithUser) {
    return this.userService.getProfile(req.user.sub);
  }

  @Patch()
  updateUser(@Req() req: IRequestWithUser, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.sub, dto);
  }
}
