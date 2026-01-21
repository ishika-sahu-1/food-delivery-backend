import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    create(createRestaurantDto: CreateRestaurantDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): string;
    remove(id: string): string;
}
