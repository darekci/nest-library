import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';

export class CreateBookCommand {
  constructor(public readonly book: Book) {}
}

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>
  ) {}

  async execute(command: CreateBookCommand): Promise<void> {
    this.repository.insert(command.book);
  }
}
