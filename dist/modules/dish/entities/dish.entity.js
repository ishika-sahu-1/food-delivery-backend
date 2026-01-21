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
exports.Dish = void 0;
const order_items_entity_1 = require("../../order/entities/order_items.entity");
const typeorm_1 = require("typeorm");
const dish_image_entity_1 = require("./dish_image.entity");
const restaurant_entity_1 = require("../../restaurant/entities/restaurant.entity");
let Dish = class Dish {
    id;
    restaurant;
    name;
    price;
    isVeg;
    category;
    isAvailable;
    orderItems;
    dishImage;
    createdAt;
    updatedAt;
};
exports.Dish = Dish;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Dish.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, (restaurnt) => restaurnt.dish, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'restaurtant_id' }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], Dish.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, name: 'name' }),
    __metadata("design:type", String)
], Dish.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: false, name: 'price' }),
    __metadata("design:type", Number)
], Dish.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_veg', default: true }),
    __metadata("design:type", Boolean)
], Dish.prototype, "isVeg", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, name: 'category' }),
    __metadata("design:type", String)
], Dish.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_available', default: true }),
    __metadata("design:type", Boolean)
], Dish.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_items_entity_1.OrderItems, (order) => order.dish, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Dish.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dish_image_entity_1.DishImage, (image) => image.dish, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Dish.prototype, "dishImage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Dish.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Dish.prototype, "updatedAt", void 0);
exports.Dish = Dish = __decorate([
    (0, typeorm_1.Entity)('dishes')
], Dish);
//# sourceMappingURL=dish.entity.js.map