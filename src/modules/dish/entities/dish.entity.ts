import { OrderItems } from "src/modules/order/entities/order_items.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DishImage } from "./dish_image.entity";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";
import { CartItem } from "src/modules/cart/entities/cart_item.entity";

@Entity('dishes')
export class Dish {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Restaurant, (restaurnt) => restaurnt.dish, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurtant_id' })
    restaurant: Restaurant

    @Column({ type: 'text', nullable: false, name: 'name' })
    name: string

    @Column({ type: 'decimal', nullable: false, name: 'price' })
    price: number
    
    @Column({ type: 'decimal', nullable: false, name: 'quantity' })
    quantity: number

    @Column({ type: 'boolean', name: 'is_veg', default: true })
    isVeg: boolean

    @Column({ type: 'text', nullable: false, name: 'category' })
    category: string

    @Column({ type: 'boolean', name: 'is_available', default: true })
    isAvailable: boolean

    @OneToMany(() => OrderItems, (order) => order.dish, {
        cascade: true
    })
    orderItems: OrderItems[];

    @OneToMany(() => CartItem, (cartItem) => cartItem.dish, {
        cascade: true
    })
    cartItem: CartItem[];

    @OneToMany(() => DishImage, (image) => image.dish, {
        cascade: true
    })
    dishImage: DishImage[];


    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
