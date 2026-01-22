import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateAuthDto { }
export enum LoginRole {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'DELIVERY',
}

export enum Platform {
    ANDROID = 'ANDROID',
    IOS = 'IOS',
    WEB = 'WEB'
}
export class LoginDTO {

    @ApiProperty({
        description: 'Mobile number must be a valid 10-digit Indian number'
    })
    @Matches(/^[6-9]\d{9}$/)
    @IsNotEmpty()
    @IsString()
    mobile: string

    @ApiProperty({
        description: 'Unique device identifier'
    })
    @IsString()
    @IsNotEmpty()
    deviceId: string;

    @ApiProperty({
        enum: Platform
    })
    @IsEnum(Platform)
    platform: Platform;

    @ApiProperty({
        enum: LoginRole,
        description: 'Role attempting login',
    })
    @IsEnum(LoginRole)
    role: LoginRole;
}