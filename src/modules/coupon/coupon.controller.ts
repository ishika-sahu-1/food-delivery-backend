import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('add')
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get('activeCoupons')
  getAllActiveCoupons() {
    return this.couponService.getAllActiveCoupons();
  }

 @Post('removeCoupon')
 removeCoupon(@Body('couponId') couponId: number) {
  return this.couponService.remove(couponId);
 }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }
}
