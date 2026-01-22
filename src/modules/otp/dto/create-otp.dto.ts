import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOtpDto {

    @ApiProperty()
    @IsNotEmpty()
    userId: string
}
