import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookRepository } from '../book-repository.interface';
import { Book } from '../book';

export class CreateBookCommand {
  constructor(public readonly book: Book) {}
}

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private repository: IBookRepository) {}

  async execute(command: CreateBookCommand): Promise<void> {
    this.repository.create(command.book);
  }
}
