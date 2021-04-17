import { Module } from '@nestjs/common';
import { BookRepository } from 'src/persistence/books/book-repository/book-repository';
import { IBookRepository } from './book-repository.interface';
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
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: IBookRepository,
      useClass: BookRepository,
    },
  ],
})
export class BooksModule {}
