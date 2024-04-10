import { Prisma } from '@prisma/client';
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
import { UserAnswerDTO } from 'src/auth/dto/useranswer/UserAnswer.dto';

@Controller('quiz')

export class QuizController {
    constructor(private quizService: QuizService) {}

    @Get('question/:id')
    getQuiz(@Param('id', ParseIntPipe) id: number) {

      return this.quizService.findQuestion(id);
    }
    
    @Post('question/:id')
    postAnswer(@Param('id', ParseIntPipe) id: number, @Body() dto: UserAnswerDTO){
      this.quizService.CreateAnswer(dto)
    }
}
