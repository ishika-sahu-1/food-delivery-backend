import { DeliveryPartner } from "./delivery_partner.entity";
export declare class DeliveryPartnerDevices {
    id: string;
    deliveryPartner: DeliveryPartner;
    deviceId: string;
    fcm_token: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
