import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody } from '@nestjs/swagger';
import { CreateBookCommand } from '../../application/books/commands/create-book.command';
import { DeleteBookCommand } from '../../application/books/commands/delete-book.command';
import { UpdateBookCommand } from '../../application/books/commands/update-book.command';
import { Book } from '../../domain/books/book';
import { GetBookQuery } from '../../application/books/queries/get-book.query';
import { GetBooksQuery } from '../../application/books/queries/get-books.query';
import { CreateBookDto } from '../../application/books/dtos/create-book.dto';
import { UpdateBookDto } from '../../application/books/dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.queryBus.execute(new GetBooksQuery());
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Book> {
    return this.queryBus.execute(new GetBookQuery(id));
  }

  @Post()
  @ApiBody({ type: CreateBookDto })
  async create(@Body() book: CreateBookDto): Promise<void> {
    return this.commandBus.execute(new CreateBookCommand(book));
  }

  @Put()
  @ApiBody({ type: UpdateBookDto })
  async update(@Body() book: UpdateBookDto): Promise<void> {
    return this.commandBus.execute(new UpdateBookCommand(book));
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.commandBus.execute(new DeleteBookCommand(id));
  }
}
