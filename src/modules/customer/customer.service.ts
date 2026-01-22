import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDevice } from './entities/customer_device.entity';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(Customer)
  private readonly customerRepo: Repository<Customer>,
    @InjectRepository(CustomerDevice)
    private readonly customerDeviceRepo: Repository<CustomerDevice>,
    private readonly otpService: OtpService) { }

  async getByMobileNumber(mobile: string) {
    return await this.customerRepo.findOne({ where: { mobile } });
  }

  async findOrCreateCustomerWithDevice(createCustomerDto: CreateCustomerDto) {

    try {
      //  Find customer by mobile
      let customer = await this.getByMobileNumber(createCustomerDto.mobile);

      //  If customer doesn't exist → create
      if (!customer) {
        customer = this.customerRepo.create({
          mobile: createCustomerDto.mobile,
          name: createCustomerDto.name,
          email: createCustomerDto.email,
        });
        customer = await this.customerRepo.save(customer);
      }

      //  Check if this device already exists for this customer
      let device = await this.customerDeviceRepo.findOne({
        where: {
          customer: { id: customer.id },
          device_id: createCustomerDto.device_id,
          platform: createCustomerDto.platform,
        },
      });

      //  If device exists → just update lastLoginAt
      if (device) {
        device.lastLoginAt = new Date();
        await this.customerDeviceRepo.save(device);
      } else {
        //  Check number of active devices
        const activeDevices = await this.customerDeviceRepo.find({
          where: { customer: { id: customer.id }, isActive: true },
        });

        if (activeDevices.length >= 3) {
          // Max 3 devices reached → throw error + send active devices info
          return {
            error: 'Maximum 3 active devices allowed',
            activeDevices: activeDevices.map((d) => ({
              deviceId: d.device_id,
              platform: d.platform,
              lastLoginAt: d.lastLoginAt,
            })),
          };
        }

        //  Create new device
        device = this.customerDeviceRepo.create({
          customer,
          device_id: createCustomerDto.device_id,
          platform: createCustomerDto.platform,
          isActive: true,
          lastLoginAt: new Date(),
        });
        await this.customerDeviceRepo.save(device);
      }

      //  Send OTP
      const otp = await this.otpService.sendOtp(customer.id);

      return { message: 'OTP sent', otp : otp };
    } catch (error) {
      return { error: error.message };
    }
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
