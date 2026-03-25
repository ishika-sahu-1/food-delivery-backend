import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RestaurantOwner } from "./retaurant_owner.entity";
import { RestaurantBranch } from "./restaurant_branch.entity";

@Entity('restaurants')
export class Restaurant {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text', nullable: false })
    name: string

    @ManyToOne(() => RestaurantOwner, (owner) => owner.restaurants)
    owner: RestaurantOwner;

    @OneToMany(() => RestaurantBranch, (branch) => branch.restaurant)
    branches: RestaurantBranch[];

    @Column({ type: 'text', nullable: true })
    cuisineType: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
