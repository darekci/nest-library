import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetActiveReservationsQuery } from 'src/application/reservations/queries/get-active-reservations.query';
import { ReservationEntity } from 'src/persistence/reservations/reservation-repository/reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('active')
  async getActiveReservations(): Promise<ReservationEntity[]> {
    return this.queryBus.execute(new GetActiveReservationsQuery());
  }
}
