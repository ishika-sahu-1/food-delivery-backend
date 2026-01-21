import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Dish } from "./dish.entity";

@Entity('dish_image')
export class DishImage {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Dish, (dish) => dish.dishImage, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'dish_id' })
    dish: Dish

    @Column({ type: 'text', name: 'image_url' })
    image_Url: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

}