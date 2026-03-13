import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateCartDto {

    @ApiProperty()
    @IsString()
    customerId: string

    @ApiProperty()
    @IsString()
    dishId: string

    @ApiProperty()
    @IsNumber()
    quantity: number
}

export class UpdateItemQuantity {

    @ApiProperty()
    @IsString()
    dishId: string

    @ApiProperty()
    @IsEnum(['increment', 'decrement'])
    action: 'increment' | 'decrement'
}