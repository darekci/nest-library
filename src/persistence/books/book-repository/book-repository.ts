import { Injectable } from '@nestjs/common';
import { IBookRepository } from 'src/domain/books/book-repository.interface';
import { Book } from 'src/domain/books/book';
import { EntityManager, EntityRepository } from 'typeorm';
import { BookEntity, createBookEntity } from './book.entity';

@Injectable()
@EntityRepository()
export class BookRepository implements IBookRepository {
  constructor(private manager: EntityManager) {}

  getBooks(): Promise<BookEntity[]> {
    return this.manager.find(BookEntity);
  }

  getBook(id: number): Promise<BookEntity> {
    return this.manager.findOne(BookEntity, id);
  }

  create(book: Book): void {
    const entity = createBookEntity(book);
    this.manager.insert(BookEntity, entity);
  }

  update(book: Book): void {
    const entity = createBookEntity(book);
    this.manager.update(BookEntity, entity.id, entity);
  }

  async delete(id: number): Promise<void> {
    const book = await this.manager.findOne(BookEntity, id);
    if (!book) {
      throw new Error('Book not found');
    }
    this.manager.remove(book);
  }
}
