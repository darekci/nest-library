import { ReservationEntity } from 'src/persistence/reservations/reservation-repository/reservation.entity';

export abstract class IReservationRepository {
  public abstract getActiveReservations(): Promise<ReservationEntity[]>;
}
