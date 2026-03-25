import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { Dish } from "src/modules/dish/entities/dish.entity";
import { RestaurantHours } from "./restaurant_hours.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { RestaurantImages } from "./restaurant_images.entity";

export enum BranchStatus {
    OPEN = 'OPEN',
    TEMP_CLOSED = 'TEMP_CLOSED',
    PERMANENTLY_CLOSED = 'PERMANENTLY_CLOSED',
}

@Entity('restaurant_branches')
export class RestaurantBranch {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.branches)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ type: 'decimal', precision: 10, scale: 8 })
    lat: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    lng: number;

    @Column({
        type: 'enum',
        enum: BranchStatus,
        default: BranchStatus.OPEN
    })
    status: BranchStatus;

    @Column({ type: 'decimal', nullable: true, precision: 3, scale: 2 })
    rating: number;

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