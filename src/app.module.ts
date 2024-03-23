import { Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { TypeOrmModule } from './db/typeorm.module';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule,
  ],
})
export class AppModule {}
