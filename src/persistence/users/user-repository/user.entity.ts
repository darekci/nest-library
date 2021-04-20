import { User } from 'src/domain/users/user';
import { ReservationEntity } from 'src/persistence/reservations/reservation-repository/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => ReservationEntity, (res) => res.user)
  reservations: ReservationEntity[];
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
