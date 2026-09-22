import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import type { IRequestWithUser } from '../auth/guards/auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({ status: 201, description: '{ success, name, order }' })
  @ApiResponse({
    status: 400,
    description: 'One or more ingredients are invalid',
  })
  @ApiResponse({ status: 401, description: 'jwt expired / Token is invalid' })
  create(@Req() req: IRequestWithUser, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user.sub, dto.ingredients);
  }
}
