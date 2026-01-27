import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto, GetAllRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Post(':id/close')
  async temporarilyCloseRestaurant(@Param('id') id: string) {
    return this.restaurantService.temporarilyCloseRestaurant(id);
  }

  @Post(':id/re-open')
  async reOpenRestaurant(@Param('id') id: string) {
    return this.restaurantService.reOpenRestaurant(id);
  }

  @Post(':id/delete')
  async deleteRestaurantPermanently(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurantPermanently(id);
  }

  @Post('getAllRestaurantList')
  async getAllRestaurantList(@Body() getAllRestaurantDto: GetAllRestaurantDto) {
    return this.restaurantService.getAllRestaurantList(getAllRestaurantDto);
  }
  // @Get()
  // findAll() {
  //   return this.restaurantService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }
}
