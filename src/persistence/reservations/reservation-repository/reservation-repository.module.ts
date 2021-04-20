import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
})
export class ReservationRepositoryModule {}
