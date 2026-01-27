import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RestaurantImages } from "./restaurant_images.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { RestaurantHours } from "./restaurant_hours.entity";
import { Dish } from "src/modules/dish/entities/dish.entity";

export enum RestaurantStatus {

    OPEN = 'OPEN',
    TEMP_CLOSED = 'TEMP_CLOSEED',
    PERMANENTLY_CLOSED = 'PERMANENTLY_CLOSED',
}

@Entity('restaurants')
export class Restaurant {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: false })
    name: string

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    lat: number

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    lng: number

    @Column({
        type: 'enum',
        enum: RestaurantStatus,
        default: RestaurantStatus.OPEN,
        name: 'status'
    })
    status: RestaurantStatus;

    @Column({ type: 'decimal', nullable: true, precision: 2, scale: 1, name: 'rating' })
    rating: number

    @OneToMany(() => RestaurantImages, (restaurant) => restaurant.restaurant, {
        cascade: true
    })
    restaurantImages: RestaurantImages[];

    @OneToMany(() => Order, (order) => order.restaurant, {
        cascade: true,
    })
    order: Order[];

    @OneToMany(() => RestaurantHours, (restaurant) => restaurant.restaurant, {
        cascade: true,
    })
    restaurantHours: RestaurantHours[];

    @OneToMany(() => Dish, (dish) => dish.restaurant, {
        cascade: true,
    })
    dish: Dish[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
