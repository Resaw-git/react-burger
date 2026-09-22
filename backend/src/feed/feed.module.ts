import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { AllOrdersGateway } from './feed.gateway';
import { UserOrdersGateway } from './user-orders.gateway';

@Module({
  imports: [OrdersModule],
  providers: [AllOrdersGateway, UserOrdersGateway],
})
export class FeedModule {}
