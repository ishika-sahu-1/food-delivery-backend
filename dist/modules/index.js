"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModules = void 0;
const customer_module_1 = require("./customer/customer.module");
const delivery_module_1 = require("./delivery/delivery.module");
const order_module_1 = require("./order/order.module");
const restaurant_module_1 = require("./restaurant/restaurant.module");
const dish_module_1 = require("./dish/dish.module");
const otp_module_1 = require("./otp/otp.module");
const auth_module_1 = require("./auth/auth.module");
exports.AppModules = [
    customer_module_1.CustomerModule,
    delivery_module_1.DeliveryModule,
    order_module_1.OrderModule,
    restaurant_module_1.RestaurantModule,
    dish_module_1.DishModule,
    auth_module_1.AuthModule,
    otp_module_1.OtpModule
];
//# sourceMappingURL=index.js.map