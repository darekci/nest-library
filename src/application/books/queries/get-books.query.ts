import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookEntity } from 'src/persistence/books/book-repository/book.entity';
import { IBookRepository } from '../book-repository.interface';

export class GetBooksQuery {}

@QueryHandler(GetBooksQuery)
export class GetBooksHandler implements IQueryHandler<GetBooksQuery> {
  constructor(private repository: IBookRepository) {}

  async execute(): Promise<BookEntity[]> {
    return this.repository.getBooks();
  }
}
