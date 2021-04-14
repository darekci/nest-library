import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../domain/book.entity";
import { BookDto } from "../models/book.dto";

export class UpdateBookCommand {
  constructor(public readonly book: BookDto) {}
}

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>
  ) {}

  async execute(command: UpdateBookCommand) {
    const entity = await this.repository.findOne(command.book.id);

    if (!entity) {
      throw new Error('Book does not exist');
    }

    if (command.book.author) {
      entity.withAuthor(command.book.author);
    }

    if (command.book.title) {
      entity.withTitle(command.book.title);
    }

    if (command.book.isbn) {
      entity.withIsbn(command.book.isbn);
    }

    if (command.book.publishYear) {
      entity.withPublishYear(command.book.publishYear);
    }

    if (command.book.publisher) {
      entity.withPublisher(command.book.publisher);
    }

    this.repository.update(entity.id, entity);
  }
}