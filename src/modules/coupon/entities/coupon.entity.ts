import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CouponUsage } from "./coupon_usage";
import { Order } from "src/modules/order/entities/order.entity";

@Entity('coupons')
export class Coupon {

    // Auto-generated UUID primary key for the coupon
    @PrimaryGeneratedColumn('uuid')
    id: string

    // Enum column to specify the type of coupon (WELCOME or GENERAL)
    @Column({ type: 'enum', name: 'coupon_type', enum: ['WELCOME', 'GENERAL'] })
    coupon_type: 'WELCOME' | 'GENERAL';

    // Text column for the coupon code, which is required
    @Column({ type: 'text', nullable: false })
    code: string;

    // Optional text column for the coupon description
    @Column({ type: 'text', nullable: true })
    description: string;

    // Enum column to specify the type of discount (PERCENTAGE, FLAT, or FREE_DELIVERY)
    @Column({ type: 'enum', name: 'discount_type', enum: ['PERCENTAGE', 'FLAT', 'FREE_DELIVERY'] })
    discount_type: 'PERCENTAGE' | 'FLAT' | 'FREE_DELIVERY';

    // Decimal column for the discount value, which is required
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    discount_value: number;

    // Decimal column for the minimum order amount required to use the coupon, which is optional and defaults to 0
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
    min_order_amount: number;

    // Decimal column for the maximum discount amount that can be applied, which is optional
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    max_discount: number;

    // Timestamp column for the start date of the coupon, which is required
    @Column({ type: 'timestamp', nullable: false })
    start_date: Date;

    // Timestamp column for the end date of the coupon, which is required
    @Column({ type: 'timestamp', nullable: false })
    end_date: Date;

    // Integer column for the total usage limit of the coupon, which is required and defaults to 0
    @Column({ type: 'int', default: 0 })
    total_usage_limit: number;

    // Integer column for the per-user usage limit of the coupon, which is required and defaults to 0
    @Column({ type: 'int', default: 0 })
    per_user_usage_limit: number;

    // Boolean column to indicate whether the coupon is active, which defaults to true
    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @OneToMany(() => Order, (order) => order.coupon, { cascade: true })
    orders: Order[];
    
    // One-to-many relationship with the CouponUsage entity, allowing for cascading operations
    @OneToMany(() => CouponUsage, (couponUsage) => couponUsage.coupon, {
        cascade: true,
    })
    couponUsages: CouponUsage[];

    // Timestamp column for when the coupon was created, automatically set by the database
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    // Timestamp column for when the coupon was last updated, automatically set by the database
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
