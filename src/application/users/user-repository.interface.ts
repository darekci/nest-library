import { User } from 'src/domain/users/users/user';
import { UserEntity } from 'src/persistence/users/user-repository/user.entity';

export abstract class IUserRepository {
  public abstract getUsers(): Promise<UserEntity[]>;
  public abstract getUser(id: number): Promise<User>;
  public abstract create(user: User): void;
  public abstract update(user: User): void;
  public abstract delete(id: number): void;
}
