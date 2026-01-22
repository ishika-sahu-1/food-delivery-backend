import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
export enum Platform {
    ANDROID = 'ANDROID',
    IOS = 'IOS',
    WEB = 'WEB'
}
export class CreateCustomerDto {

    @ApiPropertyOptional()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    mobile: string

    @ApiProperty()
    @IsNotEmpty()
    device_id: string

    @ApiProperty({
        enum: Platform
    })
    @IsEnum(Platform)
    platform: Platform;


}
