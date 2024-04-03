import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Request,
    UseGuards,
    ParseIntPipe
  } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')

export class QuizController {
    constructor(private quizService: QuizService) {}

    @Get('question/:id')
    getQuiz(@Param('id', ParseIntPipe) id: number) {

      return this.quizService.findOne(id);
    }

    @Post('question/:id')
    postAnswer(@Param('id', ParseIntPipe) id: number, @Body() answer_id: number, ){
    
    
    }
}
