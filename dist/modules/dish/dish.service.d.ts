import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
export declare class DishService {
    create(createDishDto: CreateDishDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDishDto: UpdateDishDto): string;
    remove(id: number): string;
}
