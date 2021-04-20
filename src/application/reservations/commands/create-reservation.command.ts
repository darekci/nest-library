import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { IBookRepository } from 'src/application/books/book-repository.interface';
import { IReservationRepository } from '../reservation-repository.interface';
import { IUserRepository } from 'src/application/users/user-repository.interface';
import { createReservation } from 'src/domain/reservations/reservation';

export class CreateReservationCommand {
  constructor(public readonly dto: CreateReservationDto) {}
}

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler
  implements ICommandHandler<CreateReservationCommand> {
  constructor(
    private repository: IReservationRepository,
    private userRepository: IUserRepository,
    private bookRepository: IBookRepository
  ) {}

  async execute(command: CreateReservationCommand): Promise<void> {
    const user = await this.userRepository.getUser(command.dto.userId);

    if (!user) {
      throw new Error('User does not exist');
    }

    const book = await this.bookRepository.getBook(command.dto.bookId);

    if (!book) {
      throw new Error('Book does not exist');
    }

    const isAvailable = await this.repository.isBookAvailable(
      command.dto.bookId
    );

    if (!isAvailable) {
      throw new Error('Book is already reserved');
    }

    const today = new Date();
    const deadline = new Date(today).setDate(
      today.getDate() + command.dto.reservationDays
    );

    const reservation = createReservation(null)
      .withBook(book)
      .forUser(user)
      .withFromDate(today)
      .withToDate(new Date(deadline));

    this.repository.create(reservation);
  }
}
