import { Injectable } from '@nestjs/common';
import { IReservationRepository } from 'src/application/reservations/reservation-repository.interface';
import { EntityManager, EntityRepository, LessThan, MoreThan } from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Injectable()
@EntityRepository()
export class ReservationRepository implements IReservationRepository {
  constructor(private manager: EntityManager) {}

  async getActiveReservations(): Promise<ReservationEntity[]> {
    return await this.manager.find(ReservationEntity, {
      where: {
        fromDate: LessThan(new Date()),
        toDate: MoreThan(new Date()),
      },
      relations: ['book', 'user'],
    });
  }
}
