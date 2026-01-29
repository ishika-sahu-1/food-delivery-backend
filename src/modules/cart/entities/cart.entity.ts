import { Customer } from "src/modules/customer/entities/customer.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { CartItem } from "./cart_item.entity";

export enum CartStatus {
    ACTIVE = 'ACTIVE',
    ORDERED = 'ORDERED',
    ABANDONED = 'ABANDONED '
}

@Entity('carts')
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Customer, (customer) => customer.cart)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'total_amount',
        default: 0
    })
    totalAmount: number

    @Column({ type: 'int', name: 'total_Items', default: 0 })
    totalItems: number

    @Column({
        type: 'enum',
        enum: CartStatus,
        default: CartStatus.ACTIVE
    })
    status: CartStatus

    @OneToMany(() => CartItem , (cartItem) => cartItem.cart , {cascade : true})
    cartItem : CartItem[]
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

}
