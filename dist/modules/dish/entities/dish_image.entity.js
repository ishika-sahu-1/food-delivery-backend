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
exports.DishImage = void 0;
const typeorm_1 = require("typeorm");
const dish_entity_1 = require("./dish.entity");
let DishImage = class DishImage {
    id;
    dish;
    image_Url;
    createdAt;
    updatedAt;
};
exports.DishImage = DishImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DishImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dish_entity_1.Dish, (dish) => dish.dishImage, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'dish_id' }),
    __metadata("design:type", dish_entity_1.Dish)
], DishImage.prototype, "dish", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'image_url' }),
    __metadata("design:type", String)
], DishImage.prototype, "image_Url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], DishImage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], DishImage.prototype, "updatedAt", void 0);
exports.DishImage = DishImage = __decorate([
    (0, typeorm_1.Entity)('dish_image')
], DishImage);
//# sourceMappingURL=dish_image.entity.js.map