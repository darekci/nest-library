import { User } from 'src/domain/users/users/user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity {
  private userEntity: void;

  constructor(id?: number) {
    this.id = id;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'varchar', length: 8 })
  number: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;
}

export function createUserEntity(user: User): UserEntity {
  const entity = new UserEntity(user.id);
  entity.fullName = user.fullName;
  entity.number = user.number;
  entity.phone = user.phone;
  entity.email = user.email;
  return entity;
}

export function createUserFromEntity(entity: UserEntity): User {
  const user = new User(entity.id);
  user.fullName = entity.fullName;
  user.number = entity.number;
  user.phone = entity.phone;
  user.email = entity.email;
  return user;
}
