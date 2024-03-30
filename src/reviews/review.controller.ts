import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReviewEntity } from './entity/review.entity';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('create')
  @ApiCreatedResponse({ type: ReviewEntity })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get('findAll')
  @ApiOkResponse({ type: ReviewEntity, isArray: true })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ReviewEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReviewEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.remove(id);
  }
}
