import { DeliveryPartnerDevices } from "./delivery_partner_device.entity";
import { Order } from "src/modules/order/entities/order.entity";
export declare class DeliveryPartner {
    id: string;
    name: string;
    mobile: string;
    status: 'OFFLINE' | 'ONLINE' | 'BUSY' | 'SUSPENDED';
    current_lat: number;
    current_lng: number;
    last_seen_at: Date;
    deliveryPartnerDevices: DeliveryPartnerDevices[];
    order: Order[];
    createdAt: Date;
    updatedAt: Date;
}
