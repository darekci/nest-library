import { UpdateBookDto } from 'src/api/books/update-book.dto';
import { Book, createBook } from 'src/domain/books/book.entity';

export class UpdateBookConverter {
  static convert(dto: UpdateBookDto): Book {
    const entity = createBook(dto.id)
      .withAuthor(dto.author)
      .withTitle(dto.title);

    if (dto.isbn) {
      entity.withIsbn(dto.isbn);
    }

    if (dto.publishYear) {
      entity.withPublishYear(dto.publishYear);
    }

    if (dto.publisher) {
      entity.withPublisher(dto.publisher);
    }

    return entity;
  }
}
