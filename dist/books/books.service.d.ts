import { Repository } from 'typeorm';
import { Book } from './domain/book.entity';
import { BookDto } from './models/book.dto';
export declare class BooksService {
    private bookRepository;
    constructor(bookRepository: Repository<Book>);
    findAll(): Promise<Book[]>;
    findOne(id: number): Promise<Book>;
    create(book: BookDto): void;
    update(book: BookDto): Promise<void>;
    delete(id: number): Promise<void>;
}
