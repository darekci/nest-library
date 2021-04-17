import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookEntity } from 'src/persistence/books/book-repository/book.entity';
import { IBookRepository } from '../book-repository.interface';

export class GetBookQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetBookQuery)
export class GetBookHandler implements IQueryHandler<GetBookQuery> {
  constructor(private repository: IBookRepository) {}

  async execute(query: GetBookQuery): Promise<BookEntity> {
    return this.repository.getBook(query.id);
  }
}
