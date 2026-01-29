import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartStatus } from './entities/cart.entity';
import { CartItem } from './entities/cart_item.entity';
import { Repository } from 'typeorm';
import { DishService } from '../dish/dish.service';

@Injectable()
export class CartService {

  constructor(@InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemRepo: Repository<CartItem>,
    private readonly dishService : DishService
  ) { }

  async addItemToCart(
    customerId: string,
    dishId: string,
    quantity: number = 1
  ) {
    //  Get ACTIVE cart for customer
    let cart = await this.cartRepo.findOne({
      where: {
        customer: { id : customerId },
        status: CartStatus.ACTIVE,
      },
    });

    //  If cart not exists → create one
    if (!cart) {
      cart = await this.cartRepo.save({
        customer: { id: customerId },
        totalAmount: 0,
        totalItems: 0,
        status: CartStatus.ACTIVE,
      });
    }

    // Check if dish already exists in cart
    let cartItem = await this.cartItemRepo.findOne({
      where: {
        cart: { id: cart.id },
        dish: { id: dishId },
      },
      relations: ['dish'],
    });

    //  If exists → increase quantity
    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.price = cartItem.quantity * cartItem.dish.price;

      await this.cartItemRepo.save(cartItem);
    }
    //  Else → create new cart item
    else {
      const dish = await this.dishService.findById(dishId);
    
      if (!dish) {
        throw new NotFoundException('Dish not found');
      }

      cartItem = await this.cartItemRepo.save({
        cart: { id: cart.id },
        dish: { id: dish.id },
        quantity,
        // price: dish * quantity,
      });
    }

    // 6️⃣ Recalculate cart totals
    await this.recalculateCart(cart.id);

    return {
      message: 'Item added to cart successfully',
      cartItem,
    };
  }

  async recalculateCart(cartId: string) {
    const items = await this.cartItemRepo.find({
      where: { cart: { id: cartId } },
    });

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = items.reduce((sum, i) => sum + Number(i.price), 0);

    await this.cartRepo.update(cartId, {
      totalItems,
      totalAmount,
    });
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
