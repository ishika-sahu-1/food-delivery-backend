import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerDevice } from './entities/customer_device.entity';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports : [TypeOrmModule.forFeature([Customer , CustomerDevice]), OtpModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports : [CustomerService]
})
export class CustomerModule {}
