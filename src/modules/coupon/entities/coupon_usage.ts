import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Coupon } from "./coupon.entity";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { Order } from "src/modules/order/entities/order.entity";

@Entity('coupon_usages')
@Unique(['order'])
export class CouponUsage {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ name: 'used_at' })
    usedAt: Date

    @ManyToOne(() => Coupon, (coupon) => coupon.couponUsages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'coupon_id' })
    coupon: Coupon

    @ManyToOne(() => Customer, (customer) => customer.couponUsages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @OneToOne(() => Order, (order) => order.couponUsages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Order

}