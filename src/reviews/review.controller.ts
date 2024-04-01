import { Controller, Get, Post, Body, ForbiddenException, Param, Delete, ParseIntPipe, Res} from '@nestjs/common';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiOkResponse} from '@nestjs/swagger';
import { ReviewEntity } from './entity/review.entity';
import ReviewControllerInterface from './dto/reviewController.interface';
import { ReviewControllerDto } from './dto/reviewController.dto';
import { Response } from 'express';

@Controller('review')
export class ReviewController implements ReviewControllerInterface {
  constructor(private reviewService: ReviewsService) {}

  @Post('create')
  async create(@Body() createReviewDto: CreateReviewDto, @Res() res: Response) : Promise<Response<ReviewControllerDto>> {
    const result = await this.reviewService.create(createReviewDto);
    return res.status(200).send({
      message: 'Review created succefully',
      data: result
    });
  }

  @Get('findAll')
  @ApiOkResponse({ type: ReviewEntity, isArray: true })
  async findAll(@Res() res: Response) {
    const result = await this.reviewService.findAll();
    return res.status(200).send({
      message: 'Reviews found succefully',
      data: result
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewEntity })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.reviewService.findOne(id);
    return res.status(200).send({
      message: 'Review found succefully',
      data: result
    });
    return this.reviewService.findOne(id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReviewEntity })
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const result = await this.reviewService.remove(id);
    return res.status(200).send({
      message: 'Review deleted succefully',
      data: result
    });
  }
}
