import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeliveryPartnerDevices } from "./delivery_partner_device.entity";
import { Order } from "src/modules/order/entities/order.entity";

@Entity('delivery_partner')
export class DeliveryPartner {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', name: 'name' })
    name: string

    @Column({ name: 'mobile', type: 'text' })
    mobile: string

    @Column({
        type: 'enum', name: 'current_status',
        enum: ['OFFLINE', 'ONLINE', 'BUSY', 'SUSPENDED']
        , default: 'OFFLINE'
    })
    status: 'OFFLINE' | 'ONLINE' | 'BUSY' | 'SUSPENDED'

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    current_lat: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    current_lng: number;

    @Column({ type: 'timestamp', nullable: true })
    last_seen_at: Date;

    @OneToMany(() => DeliveryPartnerDevices, (deliveryPartnerDevice) => deliveryPartnerDevice.deliveryPartner)
    deliveryPartnerDevices: DeliveryPartnerDevices[];

    @OneToMany(() => Order, (order) => order.deliveryPartner)
    order: Order[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
