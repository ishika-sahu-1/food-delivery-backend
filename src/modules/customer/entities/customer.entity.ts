import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from 'src/modules/order/entities/order.entity';
import { CustomerDevice } from './customer_device.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { CouponUsage } from 'src/modules/coupon/entities/coupon_usage';

@Entity('customers')
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', name: 'customer_name', nullable: true })
    name: string

    @Column({ type: 'varchar', nullable: false, unique: true, length: 15, name: 'customer_mobile_no' })
    mobile: string

    @Column({ type: 'varchar', length: 255, name: 'customer_email', nullable: true })
    email: string

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @OneToOne(() => Cart, (cart) => cart.customer)
    cart: Cart

    @OneToMany(() => CustomerDevice, (device) => device.customer, {
        cascade: true,
    })
    customerDevices: CustomerDevice[];


    @OneToMany(() => Order, (order) => order.customer, {
        cascade: true,
    })
    order: Order[];

    @OneToMany(() => CouponUsage, (couponUsage) => couponUsage.customer, {
        cascade: true,
    })
    couponUsages: CouponUsage[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

}
