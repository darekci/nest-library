import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './domain/book.entity';
import { BookDto } from './models/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiBody({ type: BookDto })
  async create(@Body() book: BookDto): Promise<void> {
    return this.booksService.create(book);
  }

  @Put()
  @ApiBody({ type: BookDto })
  async update(@Body() book: BookDto): Promise<void> {
    return this.booksService.update(book);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.booksService.delete(id);
  }
}
