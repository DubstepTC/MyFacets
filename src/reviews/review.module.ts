import { Module } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { ReviewController } from './review.controller';

@Module({
  controllers: [ReviewController],
  providers: [ReviewsService]
})
export class ReviewModule {}
