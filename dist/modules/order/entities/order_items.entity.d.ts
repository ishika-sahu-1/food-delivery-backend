import { Dish } from "src/modules/dish/entities/dish.entity";
import { Order } from "./order.entity";
export declare class OrderItems {
    id: string;
    dish: Dish;
    order: Order;
    dish_name: string;
    dish_price: number;
    quantity: number;
    total_price: number;
}
