import {
  EntityManager,
  EntityRepository,
  IsNull,
  LessThan,
  MoreThan,
} from 'typeorm';
import {
  ReservationEntity,
  createReservationEntity,
  createReservationFromEntity,
} from './reservation.entity';

import { IReservationRepository } from 'src/application/reservations/reservation-repository.interface';
import { Injectable } from '@nestjs/common';
import { Reservation } from 'src/domain/reservations/reservation';

@Injectable()
@EntityRepository()
export class ReservationRepository implements IReservationRepository {
  constructor(private manager: EntityManager) {}

  async getReservation(id: number): Promise<Reservation> {
    const entity = await this.manager.findOne(ReservationEntity, id);
    return createReservationFromEntity(entity);
  }

  async getActiveReservations(): Promise<ReservationEntity[]> {
    const today = new Date();
    return await this.manager.find(ReservationEntity, {
      where: {
        fromDate: LessThan(today),
        toDate: MoreThan(today),
        returnDate: IsNull(),
      },
      relations: ['book', 'user'],
    });
  }

  async isBookAvailable(bookId: number): Promise<boolean> {
    const reservations = await this.manager.find(ReservationEntity, {
      where: {
        fromDate: LessThan(new Date()),
        toDate: MoreThan(new Date()),
        returnDate: IsNull(),
        book: {
          id: bookId,
        },
      },
    });

    return !reservations.length;
  }

  create(reservation: Reservation): void {
    const entity = createReservationEntity(reservation);
    this.manager.insert(ReservationEntity, entity);
  }

  async markAsArchive(id: number): Promise<void> {
    const reservation = await this.manager.findOne(ReservationEntity, id);
    reservation.returnDate = new Date();
    this.manager.update(ReservationEntity, reservation.id, reservation);
  }
}
