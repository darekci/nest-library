import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { BooksModule } from 'src/domain/books/books.module';
import { BooksController } from './books/books.controller';
import { UsersController } from './users/users/users.controller';

@Module({
  imports: [CqrsModule, BooksModule, ApplicationModule],
  controllers: [BooksController, UsersController],
})
export class ApiModule {}
