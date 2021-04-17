import { Book } from 'src/domain/books/book';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
