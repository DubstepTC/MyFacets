import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";

export class AuthControllerDto {
  @ApiProperty()
  @IsString()
  message: string;

  @IsObject()
  @ApiProperty()
  data: object;
}