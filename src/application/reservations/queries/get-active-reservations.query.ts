import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReservationEntity } from 'src/persistence/reservations/reservation-repository/reservation.entity';
import { IReservationRepository } from '../reservation-repository.interface';

export class GetActiveReservationsQuery {}

@QueryHandler(GetActiveReservationsQuery)
export class GetActiveReservationsHandler
  implements IQueryHandler<GetActiveReservationsQuery> {
  constructor(private repository: IReservationRepository) {}

  async execute(): Promise<ReservationEntity[]> {
    return this.repository.getActiveReservations();
  }
}
