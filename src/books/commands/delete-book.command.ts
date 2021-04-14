import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../domain/book.entity";

export class DeleteBookCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>
  ) {}

  async execute(command: DeleteBookCommand) {
    return this.repository.findOne(command.id).then((book) => {
      if (!book) {
        throw new Error('Book not found');
      }

      this.repository.remove(book);
    });
  }
}