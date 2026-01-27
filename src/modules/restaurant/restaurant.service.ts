import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto, CreateRestaurantHoursDto, GetAllRestaurantDto, ImageDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant, RestaurantStatus } from './entities/restaurant.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { RestaurantImages } from './entities/restaurant_images.entity';
import { RestaurantHours } from './entities/restaurant_hours.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class RestaurantService {
  constructor(@InjectRepository(Restaurant) private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(RestaurantImages) private readonly restaurantImagesRepo: Repository<RestaurantImages>,
    @InjectRepository(RestaurantHours) private readonly restaurantHoursRepo: Repository<RestaurantHours>,
    private dataSource: DataSource
  ) { }

  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const restaurant = await queryRunner.manager.save(Restaurant, {
        name: createRestaurantDto.name,
        lat: createRestaurantDto.lat,
        lng: createRestaurantDto.lng,
        rating: createRestaurantDto.rating
      });

      await this.attachHoursToRestaurant(restaurant.id, createRestaurantDto.hours, queryRunner.manager)

      await queryRunner.commitTransaction();

      await this.attachImagesToRestaurant(restaurant.id, createRestaurantDto.images);

      return createRestaurantDto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error
    } finally {
      await queryRunner.release();
    }
  }

  async attachImagesToRestaurant(restaurantId: string, images: ImageDto[]) {

    const imageEntities = images.map(image =>
      this.restaurantImagesRepo.create({
        image_Url: image.imageUrl,
        is_Cover: image.isCover,
        restaurant: { id: restaurantId }
      })
    )
    await this.restaurantImagesRepo.save(imageEntities)
  }

  async attachHoursToRestaurant(restaurantId: string, hours: CreateRestaurantHoursDto[], manager: EntityManager) {

    const hoursEntities = hours.map(hour =>
      manager.create(RestaurantHours, {
        day_of_week: hour.day,
        open_time: hour.openTime,
        close_time: hour.closeTime,
        is_open: hour.isClosed,
        restaurant: { id: restaurantId }
      })
    )
    await manager.save(RestaurantHours, hoursEntities)
  }

  async temporarilyCloseRestaurant(id: string) {

    await this.restaurantRepo.update(id, { status: RestaurantStatus.TEMP_CLOSED })
    return this.restaurantRepo.findOneBy({ id });
  }

  async reOpenRestaurant(id: string) {

    await this.restaurantRepo.update(id, { status: RestaurantStatus.OPEN })
    return this.restaurantRepo.findOneBy({ id });
  }

  async deleteRestaurantPermanently(id: string) {

    await this.restaurantRepo.update(id, { status: RestaurantStatus.PERMANENTLY_CLOSED })
    return this.restaurantRepo.findOneBy({ id });
  }

  async getAllRestaurantList(getAllRestaurantDto: GetAllRestaurantDto) {

    const page = getAllRestaurantDto.page || 1;
    const limit = Math.min(getAllRestaurantDto.limit || 10, 50); // max 50 items
    const name = getAllRestaurantDto.name || '';
    const minRating = getAllRestaurantDto.minRating;
    const sortBy = getAllRestaurantDto.sortBy || 'createdAt';
    const sortOrder = getAllRestaurantDto.sortOrder || 'DESC';

    const query = this.restaurantRepo.createQueryBuilder('restaurant');

    // Only open restaurants
    query.where('restaurant.status = :status', { status: RestaurantStatus.OPEN });

    // Name filter
    if (name) {
      query.andWhere('restaurant.name ILIKE :name', { name: `%${name}%` }); // Postgres
    }

    // Minimum rating filter
    if (minRating !== undefined) {
      query.andWhere('restaurant.rating >= :minRating', { minRating });
    }

    // Sorting
    query.orderBy(`restaurant.${sortBy}`, sortOrder);

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


  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
