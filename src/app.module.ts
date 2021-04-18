import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { BooksModule } from './domain/books/books.module';
import { BookRepositoryModule } from './persistence/books/book-repository/book-repository.module';
import * as ormconfig from './ormconfig';
import { IBookRepository } from './application/books/book-repository.interface';
import { BookRepository } from './persistence/books/book-repository/book-repository';
import { ApplicationModule } from './application/application.module';
import { UsersModule } from './domain/users/users/users.module';
import { UserRepositoryModule } from './persistence/users/user-repository/user-repository.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ApiModule,
    BooksModule,
    BookRepositoryModule,
    ApplicationModule,
    UsersModule,
    UserRepositoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: IBookRepository,
      useClass: BookRepository,
    },
  ],
})
export class AppModule {}
