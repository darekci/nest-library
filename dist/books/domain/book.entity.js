"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.Book = void 0;
const typeorm_1 = require("typeorm");
let Book = class Book {
    constructor(id) {
        this.id = id;
    }
    withAuthor(author) {
        this.author = author;
        return this;
    }
    withTitle(title) {
        this.title = title;
        return this;
    }
    withIsbn(isbn) {
        this.isbn = isbn;
        return this;
    }
    withPublishDate(publishDate) {
        this.publishDate = publishDate;
        return this;
    }
    withPublisher(publisher) {
        this.publisher = publisher;
        return this;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Book.prototype, "publishDate", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "publisher", void 0);
Book = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Number])
], Book);
exports.Book = Book;
function createBook(id) {
    return new Book(id);
}
exports.createBook = createBook;
//# sourceMappingURL=book.entity.js.map