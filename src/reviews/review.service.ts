import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import ReviewServiceInterface from './dto/reviewService.interface';
import { ItemReviewDto } from './dto/itemReview.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ReviewsService implements ReviewServiceInterface {
  constructor(
    private prisma: PrismaService
  ) { }
  async create(dto: CreateReviewDto): Promise<ItemReviewDto> {
    const { authorId, text } = dto;
    try {
      const result = await this.prisma.review.create({
        data: {
          authorId: authorId,
          text: text
        }
      });
      if (!result) throw new BadRequestException();
      return result;
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  };

  async findAll() {
    try {
      const result = this.prisma.review.findMany({});
      if (!result) throw new BadRequestException();
      return result;
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }

  async findOne(id: number) {
    try {
      const result = this.prisma.review.findUnique({ where: { id } }); 
      if (!result) throw new BadRequestException();
      return result;
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }

  async remove(id: number) {
    try {
      const result = this.prisma.review.delete({ where: { id } });
      if (!result) throw new BadRequestException();
      return result;
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }
}
