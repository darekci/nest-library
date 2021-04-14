import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody } from '@nestjs/swagger';
import { CreateBookCommand } from './commands/create-book.command';
import { DeleteBookCommand } from './commands/delete-book.command';
import { UpdateBookCommand } from './commands/update-book.command';
import { Book } from './domain/book.entity';
import { BookDto } from './models/book.dto';
import { GetBookQuery } from './queries/get-book.query';
import { GetBooksQuery } from './queries/get-books.query';

@Controller('books')
export class BooksController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.queryBus.execute(
      new GetBooksQuery()
    );
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Book> {
    return this.queryBus.execute(
      new GetBookQuery(id)
    );
  }

  @Post()
  @ApiBody({ type: BookDto })
  async create(@Body() book: BookDto): Promise<void> {
    return this.commandBus.execute(
      new CreateBookCommand(book)
    );
  }

  @Put()
  @ApiBody({ type: BookDto })
  async update(@Body() book: BookDto): Promise<void> {
    return this.commandBus.execute(
      new UpdateBookCommand(book)
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.commandBus.execute(
      new DeleteBookCommand(id)
    );
  }
}
