import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaClient, Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service';
import { UserAnswerDTO } from 'src/auth/dto/useranswer/UserAnswer.dto';

@Injectable()
export class QuizService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async findOne(id: number) {
    return this.DatabaseService.question.findUnique({
        where: {
          id
        },
        include:{
          answers: true
        }
      })}

  async CreateAnswer(dto: UserAnswerDTO)
  {
    const { answer_id, user_id } = dto;
    const prisma = new PrismaClient()
    await prisma.userAnswer.create({
      data: {
        answer_id: answer_id,
        user_id: user_id
      },
    });
  }
}