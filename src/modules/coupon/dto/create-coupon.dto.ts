import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export enum discountType {
    PERCENTAGE = 'PERCENTAGE',
    FLAT = 'FLAT',
    FREE_DELIVERY = 'FREE_DELIVERY'
}

export enum couponType {
    WELCOME = 'WELCOME',
    GENERAL = 'GENERAL'
}

export class CreateCouponDto {

    @ApiProperty()
    @IsString()
    code: string;

    @ApiProperty({ enum: couponType })
    @IsEnum(couponType)
    couponType: couponType;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ enum: discountType })
    @IsEnum(discountType)
    discount_type: discountType;

    @ApiProperty()
    @IsNumber()
    discount_value: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    min_order_amount: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    max_discount: number;

    @ApiProperty()
    @IsDateString()
    start_date: Date;

    @ApiProperty()
    @IsDateString()
    end_date: Date;

    @ApiProperty()
    @IsNumber()
    total_usage_limit: number;

    @ApiProperty()
    @IsNumber()
    per_user_usage_limit: number;

    @ApiProperty()
    @IsBoolean()
    is_active: boolean;
}

