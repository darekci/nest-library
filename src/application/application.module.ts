import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBookService } from './books/create-book.service';
import { UpdateBookService } from './books/update-book.service';

@Module({
  imports: [CqrsModule],
  providers: [CreateBookService, UpdateBookService],
})
export class ApplicationModule {}
