import { Dish } from "src/modules/dish/entities/dish.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItems {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Dish, (dish) => dish.orderItems, {
    onDelete: 'RESTRICT', // preserve order history
  })
  @JoinColumn({ name: 'dish_id' })
  dish: Dish;

  @ManyToOne(()=> Order , (order) => order.OrderItems ,{onDelete : 'RESTRICT'})
  @JoinColumn({name : 'order_id'})
  order : Order

  // Snapshot fields (VERY IMPORTANT)
  @Column({ type: 'varchar', length: 255 })
  dish_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  dish_price: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;
}
