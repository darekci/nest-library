import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/domain/users/user';
import { IUserRepository } from '../user-repository.interface';

export class GetUserQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private repository: IUserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    return this.repository.getUser(query.id);
  }
}
