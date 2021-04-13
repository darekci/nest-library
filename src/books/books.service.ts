import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, createBook } from './domain/book.entity';
import { BookDto } from './models/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne(id);
  }

  create(book: BookDto): void {
    const entity = createBook()
      .withAuthor(book.author)
      .withTitle(book.title);

    if (book.isbn) {
      entity.withIsbn(book.isbn);
    }

    if (book.publishDate) {
      entity.withPublishDate(book.publishDate);
    }

    if (book.publisher) {
      entity.withPublisher(book.publisher);
    }
    
    this.bookRepository.insert(entity);
  }

  async update(book: BookDto): Promise<void> {
    const entity = await this.bookRepository.findOne(book.id);

    if (!entity) {
      throw new Error('Book does not exist');
    }

    if (book.author) {
      entity.withAuthor(book.author);
    }

    if (book.title) {
      entity.withTitle(book.title);
    }

    if (book.isbn) {
      entity.withIsbn(book.isbn);
    }

    if (book.publishDate) {
      entity.withPublishDate(book.publishDate);
    }

    if (book.publisher) {
      entity.withPublisher(book.publisher);
    }

    this.bookRepository.update(entity.id, entity);
  }

  async delete(id: number): Promise<void> {
    return this.bookRepository.findOne(id).then((book) => {
      if (!book) {
        throw new Error('Book not found');
      }

      this.bookRepository.remove(book);
    });
  }
}
