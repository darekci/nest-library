import {
  BookEntity,
  createBookEntity,
  createBookFromEntity,
} from './book.entity';
import {
  EntityManager,
  EntityRepository,
  IsNull,
  LessThan,
  MoreThan,
} from 'typeorm';

import { Book } from 'src/domain/books/book';
import { IBookRepository } from 'src/application/books/book-repository.interface';
import { Injectable } from '@nestjs/common';
import { ReservationEntity } from 'src/persistence/reservations/reservation-repository/reservation.entity';

@Injectable()
@EntityRepository()
export class BookRepository implements IBookRepository {
  constructor(private manager: EntityManager) {}

  getBooks(): Promise<BookEntity[]> {
    return this.manager.find(BookEntity);
  }

  async getAvailableBooks(): Promise<BookEntity[]> {
    const today = new Date();
    const currentReservations = await this.manager.find(ReservationEntity, {
      where: {
        fromDate: LessThan(today),
        toDate: MoreThan(today),
        returnDate: IsNull(),
      },
      relations: ['book', 'user'],
    });

    const books = await this.manager.find(BookEntity);

    const uniqueReservedIds = [
      ...new Set(currentReservations.map((r) => r.book.id)),
    ];

    return books.filter((book) => uniqueReservedIds.indexOf(book.id) !== 0);
  }

  async getBook(id: number): Promise<Book> {
    const entity = await this.manager.findOne(BookEntity, id);
    return createBookFromEntity(entity);
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
