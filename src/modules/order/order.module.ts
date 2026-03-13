import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItems } from './entities/order_items.entity';
import { CouponUsage } from '../coupon/entities/coupon_usage';

@Module({
  imports : [TypeOrmModule.forFeature([Order,OrderItems]),CouponUsage],
  controllers: [OrderController],
  providers: [OrderService],
  exports : [OrderService]
})
export class OrderModule {}
