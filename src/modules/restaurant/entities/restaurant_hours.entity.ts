import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity('restaurant_hours')
export class RestaurantHours {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'enum', name: 'day_of_week',
        enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    })
    day_of_week: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

    @Column({ type: 'time', name: 'open_time' })
    open_time: Timestamp

    @Column({ type: 'time', name: 'close_time' })
    close_time: Timestamp

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.restaurantHours, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

}
