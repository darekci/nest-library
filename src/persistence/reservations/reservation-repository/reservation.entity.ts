import { BookEntity } from 'src/persistence/books/book-repository/book.entity';
import { UserEntity } from 'src/persistence/users/user-repository/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
