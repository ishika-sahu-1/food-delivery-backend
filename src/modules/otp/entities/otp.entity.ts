import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ type: 'timestamp', name: 'blocked_until', nullable : true })
    blocked_until: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
