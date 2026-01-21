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
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const restaurant_images_entity_1 = require("./restaurant_images.entity");
const order_entity_1 = require("../../order/entities/order.entity");
const restaurant_hours_entity_1 = require("./restaurant_hours.entity");
const dish_entity_1 = require("../../dish/entities/dish.entity");
let Restaurant = class Restaurant {
    id;
    name;
    lat;
    lng;
    isOpen;
    rating;
    restaurantImages;
    order;
    restaurantHours;
    dish;
    createdAt;
    updatedAt;
};
exports.Restaurant = Restaurant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Restaurant.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], Restaurant.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'is_open' }),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "isOpen", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, precision: 2, scale: 1, name: 'rating' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => restaurant_images_entity_1.RestaurantImages, (restaurant) => restaurant.restaurant, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Restaurant.prototype, "restaurantImages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.restaurant, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Restaurant.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => restaurant_hours_entity_1.RestaurantHours, (restaurant) => restaurant.restaurant, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Restaurant.prototype, "restaurantHours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dish_entity_1.Dish, (dish) => dish.restaurant, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Restaurant.prototype, "dish", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Restaurant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Restaurant.prototype, "updatedAt", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, typeorm_1.Entity)('restaurants')
], Restaurant);
//# sourceMappingURL=restaurant.entity.js.map