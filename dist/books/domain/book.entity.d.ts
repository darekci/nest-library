export declare class Book {
    private bookEntity;
    constructor(id?: number);
    id: number;
    author: string;
    title: string;
    isbn: string;
    publishDate: Date;
    publisher: string;
    withAuthor(author: string): Book;
    withTitle(title: string): this;
    withIsbn(isbn: string): this;
    withPublishDate(publishDate: Date): this;
    withPublisher(publisher: string): this;
}
export declare function createBook(id?: number): Book;
