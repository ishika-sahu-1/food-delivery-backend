import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity('restaurant_entity')
export class RestaurantImages {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', name: 'image_url' })
    image_Url: string

    @Column({ type: 'boolean', default: false, nullable: false, name: 'is_cover' })
    is_Cover: boolean

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.restaurantImages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}