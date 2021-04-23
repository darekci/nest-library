import { Book } from '../books/book';
import { User } from '../users/user';

export class Reservation {
  private reservationDomain: void;

  constructor(id?: number) {
    this.id = id;
  }

  id: number;
  book: Book;
  user: User;
  fromDate: Date;
  toDate: Date;
  returnDate: Date;

  withBook(book: Book): Reservation {
    this.book = book;
    return this;
  }

  forUser(user: User): Reservation {
    this.user = user;
    return this;
  }

  withFromDate(fromDate: Date): Reservation {
    this.fromDate = fromDate;
    return this;
  }

  withToDate(toDate: Date): Reservation {
    this.toDate = toDate;
    return this;
  }
}

export function createReservation(id: number): Reservation {
  return new Reservation(id);
}
