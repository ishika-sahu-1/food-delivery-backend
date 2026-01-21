"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPartnerDevices = void 0;
const typeorm_1 = require("typeorm");
const delivery_partner_entity_1 = require("./delivery_partner.entity");
let DeliveryPartnerDevices = class DeliveryPartnerDevices {
    id;
    deliveryPartner;
    deviceId;
    fcm_token;
    isActive;
    createdAt;
    updatedAt;
};
exports.DeliveryPartnerDevices = DeliveryPartnerDevices;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeliveryPartnerDevices.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => delivery_partner_entity_1.DeliveryPartner, (deliveryPartner) => deliveryPartner.deliveryPartnerDevices, {
        cascade: true
    }),
    (0, typeorm_1.JoinColumn)({ name: 'delivery_partner_id' }),
    __metadata("design:type", delivery_partner_entity_1.DeliveryPartner)
], DeliveryPartnerDevices.prototype, "deliveryPartner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'device_id' }),
    __metadata("design:type", String)
], DeliveryPartnerDevices.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'fcm_token' }),
    __metadata("design:type", String)
], DeliveryPartnerDevices.prototype, "fcm_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], DeliveryPartnerDevices.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], DeliveryPartnerDevices.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], DeliveryPartnerDevices.prototype, "updatedAt", void 0);
exports.DeliveryPartnerDevices = DeliveryPartnerDevices = __decorate([
    (0, typeorm_1.Entity)('delivery_partner_devices')
], DeliveryPartnerDevices);
//# sourceMappingURL=delivery_partner_device.entity.js.map