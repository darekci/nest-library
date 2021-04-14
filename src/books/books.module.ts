import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './domain/book.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBookHandler } from './commands/create-book.command';
import { UpdateBookHandler } from './commands/update-book.command';
import { DeleteBookHandler } from './commands/delete-book.command';
import { GetBooksHandler } from './queries/get-books.query';
import { GetBookHandler } from './queries/get-book.query';

export const QueryHandlers = [
  GetBooksHandler,
  GetBookHandler,
]

export const CommandHandlers = [
  CreateBookHandler,
  UpdateBookHandler,
  DeleteBookHandler,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    CqrsModule,
  ],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
  ],
  controllers: [BooksController]
})
export class BooksModule {}