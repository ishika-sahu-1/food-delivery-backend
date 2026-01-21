import { Timestamp } from "typeorm";
import { Restaurant } from "./restaurant.entity";
export declare class RestaurantHours {
    id: string;
    day_of_week: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
    open_time: Timestamp;
    close_time: Timestamp;
    restaurant: Restaurant;
    createdAt: Date;
    updatedAt: Date;
}
