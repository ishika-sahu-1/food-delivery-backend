import { BadRequestException, Injectable } from '@nestjs/common';
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

  async applyCoupon(cartId: string, couponId: string) {

    const cart = await this.cartService.findById(cartId);
    if (!cart) {
      return { message: 'Cart not found' };
    }

    const coupon = await this.couponRepo.findOne({
      where: {
        id: couponId,
      }
    });

    if (!coupon) {
      return { message: 'Coupon not found' };
    }

    if (cart.totalAmount < coupon.min_order_amount) {
      throw new BadRequestException(`Minimum order amount for this coupon is ${coupon.min_order_amount}`);
    }

    const totalUsage = await this.couponUsageRepo.count({
      where: {
        coupon: { id: couponId },
      }
    });

    if (totalUsage >= coupon.total_usage_limit) {
      throw new BadRequestException('Coupon usage limit reached');
    }

    const userUsage = await this.couponUsageRepo.count({
      where: {
        coupon: { id: couponId },
        customer: { id: cart.customer.id }
      }
    });

    if (
      coupon.per_user_usage_limit &&
      userUsage >= coupon.per_user_usage_limit
    ) {
      throw new BadRequestException(
        'You have already used this coupon the maximum number of times allowed'
      );
    }

    let discountAmount = 0;

    if (coupon.discount_type === 'PERCENTAGE') {
      discountAmount = (cart.totalAmount * coupon.discount_value) / 100;
      if (coupon.max_discount) discountAmount = Math.min(discountAmount, coupon.max_discount);
    } else if (coupon.discount_type === 'FLAT') {
      discountAmount = coupon.discount_value;
    }

    const finalAmount = cart.totalAmount - discountAmount;

    return {
      finalAmount,
      discountAmount,
      message: 'Coupon applied successfully'
    };
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
