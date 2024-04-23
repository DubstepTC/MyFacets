import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class PasswordLessParamsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;
  
}