import { Order } from 'src/modules/order/entities/order.entity';
import { CustomerDevice } from './customer_device.entity';
export declare class Customer {
    id: string;
    name: string;
    mobile: string;
    email: string;
    isActive: boolean;
    customerDevices: CustomerDevice[];
    order: Order[];
    createdAt: Date;
    updatedAt: Date;
}
