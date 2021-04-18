import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookDto } from 'src/application/books/dtos/update-book.dto';
import { IBookRepository } from '../book-repository.interface';

export class UpdateBookCommand {
  constructor(public readonly dto: UpdateBookDto) {}
}

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(private repository: IBookRepository) {}

  async execute(command: UpdateBookCommand): Promise<void> {
    const book = await this.repository.getBook(command.dto.id);

    if (!book) {
      throw new Error('Book does not exist');
    }

    if (command.dto.author) {
      book.withAuthor(command.dto.author);
    }

    if (command.dto.title) {
      book.withTitle(command.dto.title);
    }

    if (command.dto.isbn) {
      book.withIsbn(command.dto.isbn);
    }

    if (command.dto.publishYear) {
      book.withPublishYear(command.dto.publishYear);
    }

    if (command.dto.publisher) {
      book.withPublisher(command.dto.publisher);
    }

    this.repository.update(book);
  }
}
