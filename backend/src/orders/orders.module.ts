import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), IngredientsModule],
  controllers: [OrdersController],
  providers: [OrdersService, AuthGuard],
  exports: [OrdersService],
})
export class OrdersModule {}
