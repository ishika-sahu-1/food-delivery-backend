import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart_item.entity';
import { DishModule } from '../dish/dish.module';

@Module({
  imports : [TypeOrmModule.forFeature([Cart , CartItem]) , DishModule],
  controllers: [CartController],
  providers: [CartService],
  exports : [CartService]
})
export class CartModule {}
