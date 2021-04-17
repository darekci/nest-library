import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookRepository } from '../book-repository.interface';

export class DeleteBookCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  constructor(private repository: IBookRepository) {}

  async execute(command: DeleteBookCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}
