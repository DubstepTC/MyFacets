import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaClient, Prisma } from '@prisma/client'
import { DatabaseService } from 'src/database/database.service';

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

  async CreateAnswer(answer_id: number, user_id: string)
  {
    const prisma = new PrismaClient()
    const createUser = await prisma.userAnswer.create({data: {answer_id: answer_id, user_id: user_id}})
  }
}
