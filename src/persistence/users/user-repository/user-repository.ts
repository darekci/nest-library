import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/users/user-repository.interface';
import { User } from 'src/domain/users/user';
import { EntityManager, EntityRepository } from 'typeorm';
import {
  createUserEntity,
  createUserFromEntity,
  UserEntity,
} from './user.entity';

@Injectable()
@EntityRepository()
export class UserRepository implements IUserRepository {
  constructor(private manager: EntityManager) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.manager.find(UserEntity);
  }

  async getUser(id: number): Promise<User> {
    const entity = await this.manager.findOne(UserEntity, id);
    return createUserFromEntity(entity);
  }

  create(user: User): void {
    const entity = createUserEntity(user);
    this.manager.insert(UserEntity, entity);
  }

  update(user: User): void {
    const entity = createUserEntity(user);
    this.manager.update(UserEntity, entity.id, entity);
  }

  async delete(id: number): Promise<void> {
    const user = await this.manager.findOne(UserEntity, id);
    if (!user) {
      throw new Error('User not found');
    }
    this.manager.remove(user);
  }
}
