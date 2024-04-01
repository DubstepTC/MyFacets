import { IsObject, IsString } from "class-validator";

export class ReviewControllerDto {
  @IsString()
  message: string;

  @IsObject()
  data: object;
}