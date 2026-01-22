import { Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginDTO, LoginRole } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';

@Injectable()
export class AuthService {

  constructor(private readonly customerService: CustomerService) { }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async login(dto: LoginDTO) {

    try {
      if (dto.role === LoginRole.CUSTOMER) {

        const reqDto: CreateCustomerDto = {
          mobile: dto.mobile,
          device_id: dto.deviceId,
          platform: dto.platform,
        };

        const otp = await this.customerService.findOrCreateCustomerWithDevice(reqDto)
        return otp;
      }
    } catch (error) {
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
