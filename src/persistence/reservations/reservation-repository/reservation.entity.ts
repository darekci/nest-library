import {
  BookEntity,
  createBookEntity,
} from 'src/persistence/books/book-repository/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  UserEntity,
  createUserEntity,
} from 'src/persistence/users/user-repository/user.entity';

import { Reservation } from 'src/domain/reservations/reservation';

@Entity({ name: 'Reservation' })
export class ReservationEntity {
  private reservationEntity: void;

  constructor(id?: number) {
    this.id = id;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BookEntity, (book) => book.reservations)
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.reservations)
  user: UserEntity;

  @Column({ type: 'datetime' })
  fromDate: Date;

  @Column({ type: 'datetime' })
  toDate: Date;

  @Column({ type: 'datetime', nullable: true })
  returnDate: Date;
}

export function createReservationEntity(
  reservation: Reservation
): ReservationEntity {
  const entity = new ReservationEntity(reservation.id);
  entity.fromDate = reservation.fromDate;
  entity.toDate = reservation.toDate;
  entity.returnDate = reservation.returnDate;
  entity.book = createBookEntity(reservation.book);
  entity.user = createUserEntity(reservation.user);
  return entity;
}

export function createReservationFromEntity(
  entity: ReservationEntity
): Reservation {
  const reservation = new Reservation(entity.id);
  reservation.fromDate = entity.fromDate;
  reservation.toDate = entity.toDate;
  reservation.returnDate = entity.returnDate;
  return reservation;
}
