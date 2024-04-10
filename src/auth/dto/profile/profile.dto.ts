import { IsOptional, IsString, IsDate, IsPhoneNumber, IsEmail, IsDateString } from "class-validator";

export class ItemProfileDto {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    middleName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsDateString()
    @IsOptional()
    dateOfBirth: Date;

    @IsPhoneNumber('RU')
    @IsOptional()
    phoneNumber: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    imageUrl: string;
}