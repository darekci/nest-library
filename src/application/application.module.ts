import { BookRepository } from 'src/persistence/books/book-repository/book-repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBookHandler } from './books/commands/create-book.command';
import { CreateReservationHandler } from './reservations/commands/create-reservation.command';
import { CreateUserHandler } from './users/commands/create-user.command';
import { DeleteBookHandler } from './books/commands/delete-book.command';
import { DeleteUserHandler } from './users/commands/delete-user.command';
import { GetActiveReservationsHandler } from './reservations/queries/get-active-reservations.query';
import { GetAvailableBooksHandler } from './books/queries/get-available-books.query';
import { GetBookHandler } from './books/queries/get-book.query';
import { GetBooksHandler } from './books/queries/get-books.query';
import { GetUserHandler } from './users/queries/get-user.query';
import { GetUsersHandler } from './users/queries/get-users.query';
import { IBookRepository } from './books/book-repository.interface';
import { IReservationRepository } from './reservations/reservation-repository.interface';
import { IUserRepository } from './users/user-repository.interface';
import { MarkAsArchivedHandler } from './reservations/commands/mark-as-archived.command';
import { Module } from '@nestjs/common';
import { ReservationRepository } from 'src/persistence/reservations/reservation-repository/reservation-repository';
import { UpdateBookHandler } from './books/commands/update-book.command';
import { UpdateUserHandler } from './users/commands/update-user.command';
import { UserRepository } from 'src/persistence/users/user-repository/user-repository';

export const QueryHandlers = [
  GetBooksHandler,
  GetAvailableBooksHandler,
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
  CreateReservationHandler,
  MarkAsArchivedHandler,
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
