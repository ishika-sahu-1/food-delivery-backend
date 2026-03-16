import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CouponUsage } from './entities/coupon_usage';
import { CartService } from '../cart/cart.service';

@Injectable()
export class CouponService {

  constructor(@InjectRepository(Coupon) private readonly couponRepo: Repository<Coupon>,
    @InjectRepository(CouponUsage) private readonly couponUsageRepo: Repository<CouponUsage>,
    private readonly cartService: CartService) { }

  async create(createCouponDto: CreateCouponDto) {
    await this.couponRepo.save(createCouponDto);
    return ({ message: 'coupon saved successfully' })
  }

  async getAllActiveCoupons() {
    const currentDate = new Date();
    return await this.couponRepo.find({
      where: {
        is_active: true,
        start_date: LessThanOrEqual(currentDate),
        end_date: MoreThanOrEqual(currentDate)
      }
    });
  }

  async applyCoupon(cartId: string) {

  }

  async couponIsUsedOrNot(couponId: string, customerId: string) {

    const coupon = await this.couponUsageRepo.findOne({
      where: {
        coupon: { id: couponId },
        customer: { id: customerId }
      }
    })

    if (coupon) {
      return ''
    }

  }
  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
