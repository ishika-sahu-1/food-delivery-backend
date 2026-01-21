import { RestaurantImages } from "./restaurant_images.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { RestaurantHours } from "./restaurant_hours.entity";
import { Dish } from "src/modules/dish/entities/dish.entity";
export declare class Restaurant {
    id: string;
    name: string;
    lat: number;
    lng: number;
    isOpen: boolean;
    rating: number;
    restaurantImages: RestaurantImages[];
    order: Order[];
    restaurantHours: RestaurantHours[];
    dish: Dish[];
    createdAt: Date;
    updatedAt: Date;
}
