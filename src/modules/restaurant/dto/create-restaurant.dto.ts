import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsBoolean, IsEnum, IsIn, IsLatitude, IsLongitude, isLongitude, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { RestaurantHours } from "../entities/restaurant_hours.entity";

export class ImageDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isCover: boolean;
}
export enum DayDto {
    MON = 'MON',
    TUE = 'TUE',
    WED = 'WED',
    THU = 'THU',
    FRI = 'FRI',
    SAT = 'SAT',
    SUN = 'SUN',
}

export class CreateRestaurantHoursDto {

    @ApiProperty()
    @IsEnum(DayDto)
    day: DayDto

    @ApiProperty({ example: '09:00:00', required: false })
    @IsOptional()
    openTime?: string

    @ApiProperty({ example: '22:00:00', required: false })
    @IsOptional()
    closeTime?: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isClosed?: boolean
}
export class CreateRestaurantDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsOptional()
    rating: number

    @ApiProperty()
    @IsLatitude()
    @IsOptional()
    lat?: number

    @ApiProperty()
    @IsLongitude()
    @IsOptional()
    lng?: number

    @ApiProperty({ type: [ImageDto] })
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images: ImageDto[]

    @ApiProperty({ type: [CreateRestaurantHoursDto] })
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateRestaurantHoursDto)
    hours: CreateRestaurantHoursDto[]

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
    minRating?: number;

    @IsOptional()
    @IsString()
    @IsIn(['name', 'rating', 'createdAt'])
    sortBy?: 'name' | 'rating' | 'createdAt' = 'createdAt';

    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC' = 'DESC';

}