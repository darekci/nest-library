import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { IUserRepository } from '../user-repository.interface';

export class UpdateUserCommand {
  constructor(public readonly dto: UpdateUserDto) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private repository: IUserRepository) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.repository.getUser(command.dto.id);

    if (!user) {
      throw new Error('User does not exist');
    }

    if (command.dto.fullName) {
      user.withFullName(command.dto.fullName);
    }

    if (command.dto.phone) {
      user.withPhone(command.dto.phone);
    }

    if (command.dto.email) {
      user.withEmail(command.dto.email);
    }

    this.repository.update(user);
  }
}
