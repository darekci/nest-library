import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';

export class GetBooksQuery {}

@QueryHandler(GetBooksQuery)
export class GetBooksHandler implements IQueryHandler<GetBooksQuery> {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>
  ) {}

  async execute() {
    return this.repository.find();
  }
}
