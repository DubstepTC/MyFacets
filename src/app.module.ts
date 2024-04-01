import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './reviews/review.module';

@Module({
  imports: [
    AuthModule,
    ReviewModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
      global: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true
    }),
  ],
})
export class AppModule {}
