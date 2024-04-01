import { Review } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewEntity implements Review{
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    author: string;

    @ApiProperty()
    authorId: number;

    @ApiProperty()
    text: string;
  
    @ApiProperty()
    createdAt: Date;
}