import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { BooksModule } from './domain/books/books.module';
import * as ormconfig from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ApiModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
