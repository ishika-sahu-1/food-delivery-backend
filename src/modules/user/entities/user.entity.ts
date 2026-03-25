import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
    RESTAURANT_OWNER = 'RESTAURANT_OWNER',
    DELIVERY_AGENT = 'DELIVERY_AGENT',
}   
@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: false })
    name: string

    @Column({ type: 'varchar', nullable: false, unique: true, length: 15 })
    mobile: string  

    @Column({ type: 'varchar', length: 255, nullable: true })
    email: string       

    @Column({ type: 'varchar', nullable: true })
    password: string

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    role : UserRole

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
