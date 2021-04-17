export class Book {
  private bookDomain: void;

  constructor(id?: number) {
    this.id = id;
  }

  id: number;

  author: string;

  title: string;

  isbn: string;

  publishYear: number;

  publisher: string;

  withAuthor(author: string): Book {
    this.author = author;
    return this;
  }

  withTitle(title: string): Book {
    this.title = title;
    return this;
  }

  withIsbn(isbn: string): Book {
    this.isbn = isbn;
    return this;
  }

  withPublishYear(publishYear: number): Book {
    this.publishYear = publishYear;
    return this;
  }

  withPublisher(publisher: string): Book {
    this.publisher = publisher;
    return this;
  }
}

export function createBook(id?: number): Book {
  return new Book(id);
}
