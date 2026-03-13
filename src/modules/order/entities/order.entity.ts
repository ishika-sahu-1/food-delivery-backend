import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItems } from "./order_items.entity";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";
import { DeliveryPartner } from "src/modules/delivery/entities/delivery_partner.entity";
import { CouponUsage } from "src/modules/coupon/entities/coupon_usage";

export enum OrderStatus {
    CREATED = 'CREATED',
    PAID = 'PAID',
    SEARCHING_FOR_DELIVERY = 'SEARCHING_FOR_DELIVERY',
    ASSIGNED = 'ASSIGNED',
    PICKED_UP = 'PICKED_UP',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERED = 'DELIVERED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type : 'int' , name : 'order_number' , default : 0})
    orderNumber : number 

    @Column({
        type: 'enum', name: 'status',
        enum: OrderStatus, default: 'CREATED'
    })
    status: OrderStatus

    @ManyToOne(() => Customer, (customer) => customer.order, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.order, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant

    @ManyToOne(() => DeliveryPartner,
        (deliveryPartner) => deliveryPartner.order,
        { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'delivery_partner_id' })
    deliveryPartner: DeliveryPartner

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    delivery_fee: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    tax: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    // ---------------- OTP ----------------

    @Column({ type: 'varchar', length: 255, nullable: true })
    otp_hash: string;

    @Column({ type: 'timestamp', nullable: true })
    otp_expires_at: Date;

    @OneToMany(() => OrderItems, (order) => order.order)
    OrderItems: OrderItems[];

    @OneToOne(() => CouponUsage, (couponUsage) => couponUsage.order)
    couponUsages: CouponUsage;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
