import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CouponUsage } from "./coupon_usage";

@Entity('coupons')
export class Coupon {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: false })
    code: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'enum', name: 'discount_type', enum: ['PERCENTAGE', 'FLAT', 'FREE_DELIVERY'] })
    discount_type: 'PERCENTAGE' | 'FLAT' | 'FREE_DELIVERY';

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    discount_value: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
    min_order_amount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    max_discount: number;

    @Column({ type: 'timestamp', nullable: false })
    start_date: Date;

    @Column({ type: 'timestamp', nullable: false })
    end_date: Date;

    @Column({ type: 'int', default: 0 })
    total_usage_limit: number;

    @Column({ type: 'int', default: 0 })
    per_user_usage_limit: number;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @OneToMany(() => CouponUsage, (couponUsage) => couponUsage.coupon, {
        cascade: true,
    })
    couponUsages: CouponUsage[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
