import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import type { IRequestWithUser } from '../auth/guards/auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: IRequestWithUser, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user.sub, dto.ingredients);
  }
}
