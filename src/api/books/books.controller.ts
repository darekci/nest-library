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
import { CreateBookCommand } from '../../domain/books/commands/create-book.command';
import { DeleteBookCommand } from '../../domain/books/commands/delete-book.command';
import { UpdateBookCommand } from '../../domain/books/commands/update-book.command';
import { Book } from '../../domain/books/book';
import { GetBookQuery } from '../../domain/books/queries/get-book.query';
import { GetBooksQuery } from '../../domain/books/queries/get-books.query';
import { CreateBookDto } from './create-book.dto';
import { UpdateBookDto } from './update-book.dto';
import { CreateBookService } from 'src/application/books/create-book.service';
import { UpdateBookService } from 'src/application/books/update-book.service';

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
    return this.commandBus.execute(
      new CreateBookCommand(CreateBookService.prepare(book))
    );
  }

  @Put()
  @ApiBody({ type: UpdateBookDto })
  async update(@Body() book: UpdateBookDto): Promise<void> {
    return this.commandBus.execute(
      new UpdateBookCommand(UpdateBookService.convert(book))
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.commandBus.execute(new DeleteBookCommand(id));
  }
}
