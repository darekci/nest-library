import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/persistence/users/user-repository/user.entity';
import { IUserRepository } from '../user-repository.interface';

export class GetUsersQuery {}

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private repository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return this.repository.getUsers();
  }
}
