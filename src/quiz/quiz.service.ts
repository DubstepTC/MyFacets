import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaClient, Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service';
import { UserAnswerDTO } from 'src/auth/dto/useranswer/UserAnswer.dto';

@Injectable()
export class QuizService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async findQuestion(id: number) {
    const question = this.DatabaseService.question.findUnique({
        where: {
          id
        },
        include:{
          answers: true
        }
      })
      return question
    }

  async CreateAnswer(dto: UserAnswerDTO)
  {
    const { answer_id, user_id } = dto;
    const prisma = new PrismaClient()
    const Found = prisma.userAnswer.findFirst({
      where:{
        OR: [{answer_id: dto.answer_id},
        {user_id: dto.user_id}]
      }
    })
    if (Found == null) throw new BadRequestException('bruh')
    else
    await prisma.userAnswer.create({
      data: {
        answer_id: answer_id,
        user_id: user_id
      },
    });
  }
}