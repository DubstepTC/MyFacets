import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { QuizModule } from './quiz/quiz.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
      global: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true
    }),
    QuizModule,
    DatabaseModule
  ],
})
export class AppModule {}
