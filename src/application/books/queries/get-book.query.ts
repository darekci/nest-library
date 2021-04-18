import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Book } from 'src/domain/books/book';
import { IBookRepository } from '../book-repository.interface';

export class GetBookQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetBookQuery)
export class GetBookHandler implements IQueryHandler<GetBookQuery> {
  constructor(private repository: IBookRepository) {}

  async execute(query: GetBookQuery): Promise<Book> {
    return this.repository.getBook(query.id);
  }
}
