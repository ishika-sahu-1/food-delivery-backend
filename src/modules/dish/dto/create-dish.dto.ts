import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsBoolean, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class DishImageDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    imageUrl : string 

}
export class CreateDishDto {

    @ApiProperty()
    @IsString()
    name : string 

    @ApiProperty()
    @IsNumber()
    price : number 

    @ApiProperty()
    @IsNumber()
    quantity : number 

    @ApiProperty()
    @IsBoolean()
    isVeg : boolean

    @ApiProperty()
    @IsString()
    category : string 

    @ApiProperty()
    @IsString()
    resturantId : string 

    @ApiProperty({type : [DishImageDto]})
    @ArrayNotEmpty()
    @ValidateNested({each : true})
    @Type(()=> DishImageDto)
    images : DishImageDto[]

 }
export class ListDto {

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    page?: number = 1;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    limit?: number = 10;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    // @IsIn(['name', 'price', 'createdAt'])
    sortBy?: 'name' | 'price' | 'createdAt' = 'createdAt';

    @ApiProperty()
    @IsOptional()
    @IsString()
    // @IsIn(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC' = 'DESC';

}
