import { CreateAuthDto, LoginDTO } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CustomerService } from '../customer/customer.service';
export declare class AuthService {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createAuthDto: CreateAuthDto): string;
    login(dto: LoginDTO): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
}
