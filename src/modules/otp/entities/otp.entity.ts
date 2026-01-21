import { Customer } from "src/modules/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Timestamp } from "typeorm/browser";

@Entity('otp_verification')
export class Otp {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false, name: 'user_id' })
    userId: string;

    @Column({ type: 'text', nullable: false, name: 'otp_hash' })
    otpHash: string;

    @Column({ type: 'int', default: 0, name: 'attempts' })
    attempts: number;

    @Column({ type: 'timestamp', name: 'expires_at' })
    expires_at: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
