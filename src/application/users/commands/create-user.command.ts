import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createUser } from 'src/domain/users/user';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserRepository } from '../user-repository.interface';

export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private repository: IUserRepository) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = createUser().withFullName(command.dto.fullName);

    if (command.dto.phone) {
      user.withPhone(command.dto.phone);
    }

    if (command.dto.email) {
      user.withEmail(command.dto.email);
    }

    this.repository.create(user);
  }
}
