import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookRepository } from 'src/persistence/books/book-repository/book-repository';
import { IBookRepository } from './books/book-repository.interface';
import { CreateBookHandler } from './books/commands/create-book.command';
import { DeleteBookHandler } from './books/commands/delete-book.command';
import { UpdateBookHandler } from './books/commands/update-book.command';
import { GetBookHandler } from './books/queries/get-book.query';
import { GetBooksHandler } from './books/queries/get-books.query';

export const QueryHandlers = [GetBooksHandler, GetBookHandler];

export const CommandHandlers = [
  CreateBookHandler,
  UpdateBookHandler,
  DeleteBookHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: IBookRepository,
      useClass: BookRepository,
    },
  ],
})
export class ApplicationModule {}
