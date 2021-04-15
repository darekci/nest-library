import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BooksModule } from 'src/domain/books/books.module';
import { BooksController } from './books/books.controller';

@Module({
  imports: [CqrsModule, BooksModule],
  controllers: [BooksController],
})
export class ApiModule {}
