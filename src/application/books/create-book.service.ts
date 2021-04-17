import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/api/books/create-book.dto';
import { Book, createBook } from 'src/domain/books/book';

@Injectable()
export class CreateBookService {
  static prepare(dto: CreateBookDto): Book {
    const entity = createBook().withAuthor(dto.author).withTitle(dto.title);

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
