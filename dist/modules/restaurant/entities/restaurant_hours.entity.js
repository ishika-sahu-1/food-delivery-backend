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
exports.RestaurantHours = void 0;
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
let RestaurantHours = class RestaurantHours {
    id;
    day_of_week;
    open_time;
    close_time;
    restaurant;
    createdAt;
    updatedAt;
};
exports.RestaurantHours = RestaurantHours;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RestaurantHours.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum', name: 'day_of_week',
        enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    }),
    __metadata("design:type", String)
], RestaurantHours.prototype, "day_of_week", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', name: 'open_time' }),
    __metadata("design:type", typeorm_1.Timestamp)
], RestaurantHours.prototype, "open_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', name: 'close_time' }),
    __metadata("design:type", typeorm_1.Timestamp)
], RestaurantHours.prototype, "close_time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, (restaurant) => restaurant.restaurantHours, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'restaurant_id' }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], RestaurantHours.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], RestaurantHours.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], RestaurantHours.prototype, "updatedAt", void 0);
exports.RestaurantHours = RestaurantHours = __decorate([
    (0, typeorm_1.Entity)('restaurant_hours')
], RestaurantHours);
//# sourceMappingURL=restaurant_hours.entity.js.map