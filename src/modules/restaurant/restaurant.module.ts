import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantHours } from './entities/restaurant_hours.entity';
import { RestaurantImages } from './entities/restaurant_images.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Restaurant, RestaurantHours , RestaurantImages])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
