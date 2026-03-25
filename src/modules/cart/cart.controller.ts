import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateItemQuantity } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('addItemToCart')
  addItemToCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addItemToCart(createCartDto);
  }

  @Post('incrementAndDecrementQuantity/:customerId')
  incrementAndDecrementQuantity(@Param('customerId') customerId : string , @Body() updateItemQuantity : UpdateItemQuantity){
    return this.cartService.incrementAndDecrementQuantity(customerId, updateItemQuantity);
  }

  @Post('removeItemFromCart/:customerId/:dishId')
  removeItemFromCart(@Param('customerId') customerId: string, @Param('dishId') dishId: string) {
    return this.cartService.removeItemFromCart(customerId, dishId);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
