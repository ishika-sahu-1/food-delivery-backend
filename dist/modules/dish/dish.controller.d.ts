import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
export declare class DishController {
    private readonly dishService;
    constructor(dishService: DishService);
    create(createDishDto: CreateDishDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDishDto: UpdateDishDto): string;
    remove(id: string): string;
}
