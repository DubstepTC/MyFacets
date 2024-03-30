import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID, MaxLength, IsOptional } from "class-validator";

export class ItemReviewDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: number;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  // author: string;

  @IsNotEmpty()
  authorId: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty()
  text: string;

  @IsDate()
  createdAt: Date;
}