import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from 'src/modules/order/entities/order.entity';
import { CustomerDevice } from './customer_device.entity';

@Entity('customers')
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', name: 'customer_name' })
    name: string

    @Column({ type: 'varchar', nullable: false, unique: true, length: 15, name: 'customer_mobile_no' })
    mobile: string

    @Column({ type: 'varchar', length: 255, name: 'customer_email' })
    email: string

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @OneToMany(() => CustomerDevice, (device) => device.customer, {
        cascade: true,
    })
    customerDevices: CustomerDevice[];

    @OneToMany(() => Order, (order) => order.customer, {
        cascade: true,
    })
    order: Order[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

}
