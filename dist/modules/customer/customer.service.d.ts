import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDevice } from './entities/customer_device.entity';
export declare class CustomerService {
    private readonly customerRepo;
    private readonly customerDeviceRepo;
    constructor(customerRepo: Repository<Customer>, customerDeviceRepo: Repository<CustomerDevice>);
    getByMobileNumber(mobile: string): Promise<Customer[] | "Customer not found">;
    create(createCustomerDto: CreateCustomerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCustomerDto: UpdateCustomerDto): string;
    remove(id: number): string;
}
