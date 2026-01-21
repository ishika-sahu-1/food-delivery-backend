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
exports.DeliveryPartner = void 0;
const typeorm_1 = require("typeorm");
const delivery_partner_device_entity_1 = require("./delivery_partner_device.entity");
const order_entity_1 = require("../../order/entities/order.entity");
let DeliveryPartner = class DeliveryPartner {
    id;
    name;
    mobile;
    status;
    current_lat;
    current_lng;
    last_seen_at;
    deliveryPartnerDevices;
    order;
    createdAt;
    updatedAt;
};
exports.DeliveryPartner = DeliveryPartner;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeliveryPartner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'name' }),
    __metadata("design:type", String)
], DeliveryPartner.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mobile', type: 'text' }),
    __metadata("design:type", String)
], DeliveryPartner.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum', name: 'current_status',
        enum: ['OFFLINE', 'ONLINE', 'BUSY', 'SUSPENDED'],
        default: 'OFFLINE'
    }),
    __metadata("design:type", String)
], DeliveryPartner.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], DeliveryPartner.prototype, "current_lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], DeliveryPartner.prototype, "current_lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], DeliveryPartner.prototype, "last_seen_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => delivery_partner_device_entity_1.DeliveryPartnerDevices, (deliveryPartnerDevice) => deliveryPartnerDevice.deliveryPartner),
    __metadata("design:type", Array)
], DeliveryPartner.prototype, "deliveryPartnerDevices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.deliveryPartner),
    __metadata("design:type", Array)
], DeliveryPartner.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], DeliveryPartner.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], DeliveryPartner.prototype, "updatedAt", void 0);
exports.DeliveryPartner = DeliveryPartner = __decorate([
    (0, typeorm_1.Entity)('delivery_partner')
], DeliveryPartner);
//# sourceMappingURL=delivery_partner.entity.js.map