import { Book } from 'src/domain/books/book';
import { ReservationEntity } from 'src/persistence/reservations/reservation-repository/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Book' })
export class BookEntity {
  private bookEntity: void;

  constructor(id?: number) {
    this.id = id;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  isbn: string;

  @Column({ nullable: true })
  publishYear: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  publisher: string;

  @OneToMany(() => ReservationEntity, (res) => res.book)
  reservations: ReservationEntity[];
}

export function createBookEntity(book: Book): BookEntity {
  const entity = new BookEntity(book.id);
  entity.author = book.author;
  entity.title = book.title;
  entity.isbn = book.isbn;
  entity.publishYear = book.publishYear;
  entity.publisher = book.publisher;
  return entity;
}

export function createBookFromEntity(entity: BookEntity): Book {
  const book = new Book(entity.id);
  book.author = entity.author;
  book.isbn = entity.isbn;
  book.publishYear = entity.publishYear;
  book.publisher = entity.publisher;
  book.title = entity.title;
  return book;
}
