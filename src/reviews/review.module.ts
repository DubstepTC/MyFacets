import { Module } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewsService],
  imports: [PrismaModule],
})
export class ReviewModule {}
