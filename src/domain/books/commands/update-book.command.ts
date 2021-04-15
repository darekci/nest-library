import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';

export class UpdateBookCommand {
  constructor(public readonly book: Book) {}
}

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>
  ) {}

  async execute(command: UpdateBookCommand): Promise<void> {
    const entity = await this.repository.findOne(command.book.id);

    if (!entity) {
      throw new Error('Book does not exist');
    }

    this.repository.update(entity.id, entity);
  }
}
