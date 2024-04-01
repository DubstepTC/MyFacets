import { Response } from "express";
import { CreateReviewDto } from './create-review.dto';
import { ReviewControllerDto } from "./reviewController.dto";

export default interface ReviewControllerInterface {
  create(dto: CreateReviewDto, res: Response): Promise<Response<ReviewControllerDto>>;
}