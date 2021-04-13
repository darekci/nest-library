import { BooksService } from './books.service';
import { Book } from './domain/book.entity';
import { BookDto } from './models/book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(): Promise<Book[]>;
    find(id: number): Promise<Book>;
    create(book: BookDto): Promise<void>;
    update(book: BookDto): Promise<void>;
    delete(id: number): Promise<void>;
}
