import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
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

  withAuthor(author: string): Book {
    this.author = author;
    return this;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withIsbn(isbn: string) {
    this.isbn = isbn;
    return this;
  }

  withPublishYear(publishYear: number) {
    this.publishYear = publishYear;
    return this;
  }

  withPublisher(publisher: string) {
    this.publisher = publisher;
    return this;
  }
}

export function createBook(id?: number): Book {
  return new Book(id);
}