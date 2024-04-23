import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length, IsStrongPassword } from 'class-validator';

export class SignupParamsDto {
  @IsNotEmpty()
  @IsString()
  public first_name: string;

  @IsNotEmpty()
  @IsString()
  public middle_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsStrongPassword()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  public password: string;
  
}
