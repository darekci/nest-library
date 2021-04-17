import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
})
export class BookRepositoryModule {}
