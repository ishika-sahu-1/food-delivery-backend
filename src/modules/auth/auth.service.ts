import { Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginDTO , LoginRole} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AuthService {

  constructor(private readonly customerService : CustomerService){}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

 async login(dto : LoginDTO){

    try{
      if(dto.role === LoginRole.CUSTOMER){
        
        const existCustomer = await this.customerService.getByMobileNumber(dto.mobile);

        if(!existCustomer){
          return 'Customer not found'
        }
        return existCustomer;
      }
    }catch(error){
      return error
    }
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
