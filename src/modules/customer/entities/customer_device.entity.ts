import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity('customer_devices')
export class CustomerDevice {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Customer, (customer) => customer.customerDevices, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ type: 'text' , name : 'deivce_id'})
    device_id: string

    @Column({
        type: 'enum',
        enum: ['ANDROID', 'IOS', 'WEB'],
        default: 'ANDROID'
    })
    platform: 'ANDROID' | 'IOS' | 'WEB'

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @Column({ type: 'timestamp', nullable: true })
    lastLoginAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

}