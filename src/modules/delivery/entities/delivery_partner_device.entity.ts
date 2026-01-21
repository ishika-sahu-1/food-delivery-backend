import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeliveryPartner } from "./delivery_partner.entity";

@Entity('delivery_partner_devices')
export class DeliveryPartnerDevices {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => DeliveryPartner, (deliveryPartner) => deliveryPartner.deliveryPartnerDevices, {
        cascade: true
    })
    @JoinColumn({ name: 'delivery_partner_id' })
    deliveryPartner: DeliveryPartner

    @Column({ type: 'text', name: 'device_id' })
    deviceId: string

    @Column({ type: 'text', name: 'fcm_token' })
    fcm_token: string

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}