import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Book } from '../book';
import { IBookRepository } from '../book-repository.interface';

export class UpdateBookCommand {
  constructor(public readonly book: Book) {}
}

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(private repository: IBookRepository) {}

  async execute(command: UpdateBookCommand): Promise<void> {
    const entity = await this.repository.getBook(command.book.id);

    if (!entity) {
      throw new Error('Book does not exist');
    }

    this.repository.update(command.book);
  }
}
