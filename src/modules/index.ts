import { CustomerModule } from "./customer/customer.module";
import { DeliveryModule } from "./delivery/delivery.module";
import { OrderModule } from "./order/order.module";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { DishModule } from "./dish/dish.module";
import { OtpModule } from "./otp/otp.module";
import { AuthModule } from "./auth/auth.module";
import { CartModule } from "./cart/cart.module";
export const AppModules = [
    CustomerModule,
    DeliveryModule,
    OrderModule,
    RestaurantModule,
    DishModule,
    AuthModule,
    OtpModule,
    CartModule
];