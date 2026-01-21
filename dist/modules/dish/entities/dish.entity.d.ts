import { OrderItems } from "src/modules/order/entities/order_items.entity";
import { DishImage } from "./dish_image.entity";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";
export declare class Dish {
    id: string;
    restaurant: Restaurant;
    name: string;
    price: number;
    isVeg: boolean;
    category: string;
    isAvailable: boolean;
    orderItems: OrderItems[];
    dishImage: DishImage[];
    createdAt: Date;
    updatedAt: Date;
}
