import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class PasswordLessParamsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;
  
}