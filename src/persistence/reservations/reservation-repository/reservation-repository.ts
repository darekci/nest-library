import { EntityManager, EntityRepository, LessThan, MoreThan } from 'typeorm';
import {
  ReservationEntity,
  createReservationEntity,
} from './reservation.entity';

import { IReservationRepository } from 'src/application/reservations/reservation-repository.interface';
import { Injectable } from '@nestjs/common';
import { Reservation } from 'src/domain/reservations/reservation';

@Injectable()
@EntityRepository()
export class ReservationRepository implements IReservationRepository {
  constructor(private manager: EntityManager) {}

  async getActiveReservations(): Promise<ReservationEntity[]> {
    const today = new Date();
    return await this.manager.find(ReservationEntity, {
      where: {
        fromDate: LessThan(today),
        toDate: MoreThan(today),
      },
      relations: ['book', 'user'],
    });
  }

  async isBookAvailable(bookId: number): Promise<boolean> {
    const reservations = await this.manager.find(ReservationEntity, {
      where: {
        fromDate: LessThan(new Date()),
        toDate: MoreThan(new Date()),
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
}
