import { IsNotEmpty, IsOptional, IsString, IsDate, IsPhoneNumber, IsEmail } from "class-validator";

export class ItemProfileDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    middleName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsDate()
    @IsOptional()
    dateOfBirth: Date;

    @IsPhoneNumber('RU')
    @IsOptional()
    phoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}