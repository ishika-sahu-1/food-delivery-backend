import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponUsage } from './entities/coupon_usage';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, CouponUsage]) , OrderModule],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
