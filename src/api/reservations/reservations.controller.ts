import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody } from '@nestjs/swagger';
import { CreateReservationCommand } from 'src/application/reservations/commands/create-reservation.command';
import { MarkAsArchivedCommand } from 'src/application/reservations/commands/mark-as-archived.command';
import { CreateReservationDto } from 'src/application/reservations/dtos/create-reservation.dto';
import { GetActiveReservationsQuery } from 'src/application/reservations/queries/get-active-reservations.query';
import { ReservationEntity } from 'src/persistence/reservations/reservation-repository/reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('active')
  async getActiveReservations(): Promise<ReservationEntity[]> {
    return this.queryBus.execute(new GetActiveReservationsQuery());
  }

  @Post()
  @ApiBody({ type: CreateReservationDto })
  async create(@Body() reservation: CreateReservationDto): Promise<void> {
    return this.commandBus.execute(new CreateReservationCommand(reservation));
  }

  @Post('return/:id')
  async markAsArchived(@Param('id') id: number): Promise<void> {
    return this.commandBus.execute(new MarkAsArchivedCommand(id));
  }
}
