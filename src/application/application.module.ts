import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookRepository } from 'src/persistence/books/book-repository/book-repository';
import { ReservationRepository } from 'src/persistence/reservations/reservation-repository/reservation-repository';
import { UserRepository } from 'src/persistence/users/user-repository/user-repository';
import { IBookRepository } from './books/book-repository.interface';
import { CreateBookHandler } from './books/commands/create-book.command';
import { DeleteBookHandler } from './books/commands/delete-book.command';
import { UpdateBookHandler } from './books/commands/update-book.command';
import { GetBookHandler } from './books/queries/get-book.query';
import { GetBooksHandler } from './books/queries/get-books.query';
import { GetActiveReservationsHandler } from './reservations/queries/get-active-reservations.query';
import { IReservationRepository } from './reservations/reservation-repository.interface';
import { CreateUserHandler } from './users/commands/create-user.command';
import { DeleteUserHandler } from './users/commands/delete-user.command';
import { UpdateUserHandler } from './users/commands/update-user.command';
import { GetUserHandler } from './users/queries/get-user.query';
import { GetUsersHandler } from './users/queries/get-users.query';
import { IUserRepository } from './users/user-repository.interface';

export const QueryHandlers = [
  GetBooksHandler,
  GetBookHandler,
  GetUsersHandler,
  GetUserHandler,
  GetActiveReservationsHandler,
];

export const CommandHandlers = [
  CreateBookHandler,
  UpdateBookHandler,
  DeleteBookHandler,
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    {
      provide: IBookRepository,
      useClass: BookRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IReservationRepository,
      useClass: ReservationRepository,
    },
  ],
})
export class ApplicationModule {}
