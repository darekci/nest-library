import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookRepository } from '../book-repository.interface';
import { createBook } from '../../../domain/books/book';
import { CreateBookDto } from 'src/application/books/dtos/create-book.dto';

export class CreateBookCommand {
  constructor(public readonly dto: CreateBookDto) {}
}

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private repository: IBookRepository) {}

  async execute(command: CreateBookCommand): Promise<void> {
    const book = createBook()
      .withAuthor(command.dto.author)
      .withTitle(command.dto.title);

    if (command.dto.isbn) {
      book.withIsbn(command.dto.isbn);
    }

    if (command.dto.publishYear) {
      book.withPublishYear(command.dto.publishYear);
    }

    if (command.dto.publisher) {
      book.withPublisher(command.dto.publisher);
    }

    this.repository.create(book);
  }
}
