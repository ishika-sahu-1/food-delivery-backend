import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto, UpdateItemQuantity } from './dto/create-cart.dto';
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
    private readonly dishService: DishService
  ) { }

  async addItemToCart(dto: CreateCartDto) {

    const { customerId, dishId, quantity } = dto

    //  Get ACTIVE cart for customer
    let cart = await this.cartRepo.findOne({
      where: {
        customer: { id: customerId },
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
      cartItem.subtotal = cartItem.quantity * cartItem.dish.price;
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
        price: dish.price * quantity,
        subtotal: dish.price * quantity,
      })
    }

    // 6️⃣ Recalculate cart totals
    await this.recalculateCart(cart.id);

    const updatedCart = await this.cartRepo.findOne({
      where: { id: cart.id },
      relations: [
        'cartItem',
        'cartItem.dish',
        'customer',
      ],
    });

    return {
      message: 'Item added to cart successfully',
      updatedCart
    };
  }

  async incrementAndDecrementQuantity(customerId: string, updateItemQuantity: UpdateItemQuantity) {

    const cart = await this.cartRepo.findOne({
      where: {
        customer: { id: customerId },
        status: CartStatus.ACTIVE
      }
    });

    if (!cart) {
      throw new NotFoundException('Active cart not found for the customer');
    }
    let cartItem = await this.cartItemRepo.findOne({
      where: {
        dish: { id: updateItemQuantity.dishId }
      },
      relations: ['dish']
    });

    if (updateItemQuantity.action === 'increment') {

      if (cartItem) {
        cartItem.quantity += 1;
        cartItem.price = cartItem.quantity * cartItem.dish.price;
        cartItem.subtotal = cartItem.quantity * cartItem.dish.price;
        await this.cartItemRepo.save(cartItem);
       await this.recalculateCart(cart.id);
        return {
          message: 'Item quantity incremented successfully',
          updatedCart: await this.cartRepo.findOne({
            where: { id: cart.id },
            relations: [
              'cartItem',
              'cartItem.dish',
              'customer',
            ],
          })
        };
      }

      cartItem = await this.cartItemRepo.create({
        cart: { id: cart.id },
        dish: { id: updateItemQuantity.dishId },
        quantity: 1,
      });
      await this.cartItemRepo.save(cartItem);
      await this.cartItemRepo.update(cartItem.id, {
        price: cartItem.dish.price,
        subtotal: cartItem.dish.price
      })
      await this.recalculateCart(cart.id);
      return {
        message: 'Item quantity incremented successfully',
        updatedCart: await this.cartRepo.findOne({
          where: { id: cart.id },
          relations: [
            'cartItem',
            'cartItem.dish',
            'customer',
          ],
        })
      };
    }


    if (updateItemQuantity.action === 'decrement') {

      if (!cartItem) {
        throw new NotFoundException('Cart item not found for the dish');
      }

      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        cartItem.price = cartItem.quantity * cartItem.dish.price;
        cartItem.subtotal = cartItem.quantity * cartItem.dish.price;
        await this.cartItemRepo.save(cartItem);
      }
      await this.recalculateCart(cart.id);
      return {
        message: 'Item quantity incremented successfully',
        updatedCart: await this.cartRepo.findOne({
          where: { id: cart.id },
          relations: [
            'cartItem',
            'cartItem.dish',
            'customer',
          ],
        })
      };
    }

  }

  async removeItemFromCart(customerId: string, dishId: string) {

    const cart = await this.cartRepo.findOne({
      where: {
        customer: { id: customerId },
        status: CartStatus.ACTIVE
      }
    });

    if (!cart) {
      throw new NotFoundException('Active cart not found for the customer');
    }

    const cartItem = await this.cartItemRepo.findOne({
      where: {
        dish: { id: dishId }
      }
    })

    if (!cartItem) {
      throw new NotFoundException('Cart item not found for the dish');
    }

    await this.cartItemRepo.delete(cartItem.id);
    await this.recalculateCart(cart.id);
    return {
      message: 'Item removed from cart successfully',
      updatedCart: await this.cartRepo.findOne({
        where: { id: cart.id },
        relations: [
          'cartItem',
          'cartItem.dish',
          'customer',
        ],
      })
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
   return this.cartRepo.find({
      relations: [
        'cartItem',
        'cartItem.dish',
        'customer',
      ],
    });
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
