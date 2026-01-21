import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPartner } from './entities/delivery_partner.entity';
import { DeliveryPartnerDevices } from './entities/delivery_partner_device.entity';

@Module({
  imports : [TypeOrmModule.forFeature([DeliveryPartner , DeliveryPartnerDevices])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
