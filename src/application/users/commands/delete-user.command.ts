import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../user-repository.interface';

export class DeleteUserCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private repository: IUserRepository) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}
