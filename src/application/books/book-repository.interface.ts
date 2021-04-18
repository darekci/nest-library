import { BookEntity } from 'src/persistence/books/book-repository/book.entity';
import { Book } from '../../domain/books/book';

export abstract class IBookRepository {
  public abstract getBooks(): Promise<BookEntity[]>;
  public abstract getBook(id: number): Promise<Book>;
  public abstract create(book: Book): void;
  public abstract update(book: Book): void;
  public abstract delete(id: number): Promise<void>;
}
