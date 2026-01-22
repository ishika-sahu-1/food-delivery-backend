import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import * as bcrypt from 'bcrypt';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class OtpService {

  constructor(@InjectRepository(Otp) private readonly otpRepo: Repository<Otp>) { }
  async generateOtp() {
    return await Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  }

  async hashOtp(otp: string) {
    const SALT_ROUNDS = 10;

    return await bcrypt.hash(otp, SALT_ROUNDS);
  }

  async sendOtp(userId: string) {

    let otp = await this.generateOtp();
    let otpHash = await this.hashOtp(otp);
    const now = new Date();

    console.log(otp,otpHash)
    let otpRecord = await this.otpRepo.findOne({ where: { userId: userId } });

    if (otpRecord) {

      if (otpRecord.blocked_until && otpRecord.blocked_until > now) {
        throw new BadRequestException('Please Try again later')
      }

      if (otpRecord && otpRecord.attempts >= 3) {
        otpRecord.blocked_until = new Date(Date.now() + 2 * 60 * 1000);
        await this.otpRepo.save(otpRecord);

        throw new BadRequestException(
          'You are blocked for 2 minutes due to multiple OTP requests.',
        );
      }

      otpRecord.otpHash = otpHash,
        otpRecord.attempts += 1,
        otpRecord.expires_at = new Date(Date.now() + 60 * 1000);

      await this.otpRepo.save(otpRecord);
      return otp;
    } else {
      otpRecord = await this.otpRepo.create({
        userId: userId,
        otpHash: otpHash,
        attempts: 0,
        expires_at: new Date(Date.now() + 60 * 1000),
      });
      await this.otpRepo.save(otpRecord);
      return otp;
    }
  }

findAll() {
  return `This action returns all otp`;
}

findOne(id: number) {
  return `This action returns a #${id} otp`;
}

update(id: number, updateOtpDto: UpdateOtpDto) {
  return `This action updates a #${id} otp`;
}

remove(id: number) {
  return `This action removes a #${id} otp`;
}
}
