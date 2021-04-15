import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { CreateBookHandler } from './commands/create-book.command';
import { DeleteBookHandler } from './commands/delete-book.command';
import { UpdateBookHandler } from './commands/update-book.command';
import { GetBookHandler } from './queries/get-book.query';
import { GetBooksHandler } from './queries/get-books.query';

export const QueryHandlers = [GetBooksHandler, GetBookHandler];

export const CommandHandlers = [
  CreateBookHandler,
  UpdateBookHandler,
  DeleteBookHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  exports: [GetBooksHandler],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class BooksModule {}
