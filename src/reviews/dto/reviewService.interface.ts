import { CreateReviewDto } from './create-review.dto';
import { ItemReviewDto } from './itemReview.dto';

export default interface ReviewServiceInterface {
  create(dto: CreateReviewDto): Promise<ItemReviewDto>;
}
