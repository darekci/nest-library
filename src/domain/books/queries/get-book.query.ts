import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';

export class GetBookQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetBookQuery)
export class GetBookHandler implements IQueryHandler<GetBookQuery> {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>
  ) {}

  async execute(query: GetBookQuery) {
    return this.repository.findOne(query.id);
  }
}
