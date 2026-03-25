import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { RestaurantBranch } from "./restaurant_branch.entity";

@Entity('restaurants_images')
export class RestaurantImages {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', name: 'image_url' })
    image_Url: string

    @Column({ type: 'boolean', default: false, nullable: false, name: 'is_cover' })
    is_Cover: boolean

    @ManyToOne(() => RestaurantBranch, (restaurant) => restaurant.restaurantImages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}