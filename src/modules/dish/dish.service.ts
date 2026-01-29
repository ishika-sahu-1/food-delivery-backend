import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDishDto, ListDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { Repository } from 'typeorm';
import { DishImage } from './entities/dish_image.entity';

@Injectable()
export class DishService {

  constructor(@InjectRepository(Dish) private readonly dishRepo: Repository<Dish>,
    @InjectRepository(DishImage) private readonly dishImageRepo: Repository<DishImage>) { }

  async createOrUpdate(createDishDto: CreateDishDto) {

    const existingDish = await this.dishRepo.findOne({
      where: {
        restaurant: { id: createDishDto.resturantId },
        name: createDishDto.name,
        quantity: createDishDto.quantity
      }
    });

    let dish: Dish;

    if (existingDish) {
      //  UPDATE
      dish = await this.dishRepo.save({
        ...existingDish,
        category: createDishDto.category,
        isVeg: createDishDto.isVeg,
        price: createDishDto.price
      });

      // Optional: replace images
      await this.dishImageRepo.delete({ dish: { id: dish.id } });

    } else {
      // ➕ CREATE
      dish = await this.dishRepo.save({
        name: createDishDto.name,
        category: createDishDto.category,
        isVeg: createDishDto.isVeg,
        price: createDishDto.price,
        quantity: createDishDto.quantity,
        restaurant: { id: createDishDto.resturantId }
      });
    }

    await this.attachImagesToDish(dish.id, createDishDto.images);

    return dish;
  }


  async attachImagesToDish(dishId: string, dishes) {
    const images = dishes.map((dish) =>
      this.dishImageRepo.create({
        image_Url: dish.imageUrl,
        dish: { id: dishId },
      })
    );

    await this.dishImageRepo.save(images);
  }

  async getListforUsers(listDto : ListDto){

    try{
      
          const page = listDto.page || 1;
          const limit = Math.min(listDto.limit || 10, 50); // max 50 items
          const name = listDto.name || '';
          const price = listDto.price;
          const sortBy = listDto.sortBy || 'createdAt';
          const sortOrder = listDto.sortOrder || 'DESC';
      
          const query = this.dishRepo.createQueryBuilder('dish');
      
          // Only open restaurants
          query.where('dish.isAvailable = :isAvailable', { isAvailable: true });
      
          // Name filter
          if (name) {
            query.andWhere('dish.name LIKE :name', { name: `%${name}%` }); // Postgres
          }
        
          // Minimum rating filter
          if (price !== undefined) {
            query.andWhere('dish.price >= :price', { price });
          }
      
          // Sorting
          query.orderBy(`dish.${sortBy}`, sortOrder);
      
          // Pagination
          query.skip((page - 1) * limit).take(limit);
      
          // Execute query
          const [data, total] = await query.getManyAndCount();
      
          return {
            data,
            meta: {
              total,
              page,
              lastPage: Math.ceil(total / limit),
            },
          };
        }
      
      catch(error){
      }
  }
      
    async getListforAdmin(listDto : ListDto){

    try{
      
          const page = listDto.page || 1;
          const limit = Math.min(listDto.limit || 10, 50); // max 50 items
          const name = listDto.name || '';
          const price = listDto.price;
          const sortBy = listDto.sortBy || 'createdAt';
          const sortOrder = listDto.sortOrder || 'DESC';
      
          const query = this.dishRepo.createQueryBuilder('dish');
      
          // Only open restaurants
          query.where('dish.isAvailable = :isAvailable', { isAvailable: true });
      
          // Name filter
          if (name) {
            query.andWhere('dish.name LIKE :name', { name: `%${name}%` }); // Postgres
          }
        
          // Minimum rating filter
          if (price !== undefined) {
            query.andWhere('dish.price >= :price', { price });
          }
      
          // Sorting
          query.orderBy(`dish.${sortBy}`, sortOrder);
      
          // Pagination
          query.skip((page - 1) * limit).take(limit);
      
          // Execute query
          const [data, total] = await query.getManyAndCount();
      
          return {
            data,
            meta: {
              total,
              page,
              lastPage: Math.ceil(total / limit),
            },
          };
        }
      
      catch(error){
      }
  }
      
  async removeDishFromMenu(id : string){

    try {
      await this.dishRepo.update(id , {isAvailable : false});
      return 'Dish successfully remove from menu'
    } catch (error) {
      throw error
    }
  }

  async findById(id : string){
    return await this.dishRepo.findOne({where : {id : id}})
  }
  findAll() {
    return `This action returns all dish`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dish`;
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }
}
