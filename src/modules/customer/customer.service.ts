import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDevice } from './entities/customer_device.entity';

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(Customer)
  private readonly customerRepo: Repository<Customer>,
@InjectRepository(CustomerDevice)
  private readonly customerDeviceRepo: Repository<CustomerDevice>) { }

  async getByMobileNumber(mobile: string) {

    const customer = await this.customerRepo.findBy({ mobile: mobile })

    if (!customer) {
      return 'Customer not found'
    } else {
      return customer
    }
  }


  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
