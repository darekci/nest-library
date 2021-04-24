import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookEntity } from 'src/persistence/books/book-repository/book.entity';
import { IBookRepository } from '../book-repository.interface';

export class GetAvailableBooksQuery {}

@QueryHandler(GetAvailableBooksQuery)
export class GetAvailableBooksHandler
  implements IQueryHandler<GetAvailableBooksQuery> {
  constructor(private repository: IBookRepository) {}

  async execute(): Promise<BookEntity[]> {
    return this.repository.getAvailableBooks();
  }
}
