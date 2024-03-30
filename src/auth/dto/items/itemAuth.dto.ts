import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";

export class ItemAuthDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  middle_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updateAt: Date;
}