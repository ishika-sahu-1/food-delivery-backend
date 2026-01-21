import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports : [CustomerModule,],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
