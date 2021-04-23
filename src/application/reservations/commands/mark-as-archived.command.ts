import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IReservationRepository } from '../reservation-repository.interface';

export class MarkAsArchivedCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(MarkAsArchivedCommand)
export class MarkAsArchivedHandler
  implements ICommandHandler<MarkAsArchivedCommand> {
  constructor(private repository: IReservationRepository) {}

  async execute(command: MarkAsArchivedCommand): Promise<void> {
    const reservation = await this.repository.getReservation(command.id);

    if (!reservation) {
      throw new Error('Reservation does not exist');
    }

    await this.repository.markAsArchive(command.id);
  }
}
