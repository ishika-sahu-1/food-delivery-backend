import { Customer } from "./customer.entity";
export declare class CustomerDevice {
    id: string;
    customer: Customer;
    device_id: string;
    platform: 'ANDROID' | 'IOS' | 'WEB';
    isActive: boolean;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
