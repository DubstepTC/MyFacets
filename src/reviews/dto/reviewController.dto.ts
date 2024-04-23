import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";

export class ReviewControllerDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsObject()
  data: object;
}