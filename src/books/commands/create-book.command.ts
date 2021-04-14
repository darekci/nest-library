import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book, createBook } from "../domain/book.entity";
import { BookDto } from "../models/book.dto";

export class CreateBookCommand {
  constructor(public readonly book: BookDto) {}
}

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(
    @InjectRepository(Book)
    private repository: Repository<Book>
  ) {}

  async execute(command: CreateBookCommand) {
    const entity = createBook()
      .withAuthor(command.book.author)
      .withTitle(command.book.title);

    if (command.book.isbn) {
      entity.withIsbn(command.book.isbn);
    }

    if (command.book.publishYear) {
      entity.withPublishYear(command.book.publishYear);
    }

    if (command.book.publisher) {
      entity.withPublisher(command.book.publisher);
    }
    
    this.repository.insert(entity);
  }
}