import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Dish } from "src/modules/dish/entities/dish.entity";

@Entity('cart_items')
@Unique(['cart', 'dish'])
export class CartItem {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Cart, (cart) => cart.cartItem, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cart_id' })
    cart: Cart

    @ManyToOne(() => Dish, (dish) => dish.cartItem , { onDelete : 'CASCADE'})
    @JoinColumn({name : 'dish_id'})
    dish : Dish

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'price',
        default: 0
    })
    price: number

    @Column({ type: 'int', name: 'quantity', default: 1 })
    quantity: number

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'subtotal',
        default: 0
    })
    subtotal: number

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}