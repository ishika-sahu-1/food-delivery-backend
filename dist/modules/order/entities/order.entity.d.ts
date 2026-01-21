import { OrderItems } from "./order_items.entity";
import { Customer } from "src/modules/customer/entities/customer.entity";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";
import { DeliveryPartner } from "src/modules/delivery/entities/delivery_partner.entity";
export declare enum OrderStatus {
    CREATED = "CREATED",
    PAID = "PAID",
    SEARCHING_FOR_DELIVERY = "SEARCHING_FOR_DELIVERY",
    ASSIGNED = "ASSIGNED",
    PICKED_UP = "PICKED_UP",
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class Order {
    id: string;
    orderNumber: number;
    status: OrderStatus;
    customer: Customer;
    restaurant: Restaurant;
    deliveryPartner: DeliveryPartner;
    subtotal: number;
    delivery_fee: number;
    tax: number;
    total: number;
    otp_hash: string;
    otp_expires_at: Date;
    OrderItems: OrderItems[];
    createdAt: Date;
    updatedAt: Date;
}
