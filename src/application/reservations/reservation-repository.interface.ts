import { Reservation } from 'src/domain/reservations/reservation';
import { ReservationEntity } from 'src/persistence/reservations/reservation-repository/reservation.entity';

export abstract class IReservationRepository {
  public abstract getReservation(id: number): Promise<Reservation>;
  public abstract getActiveReservations(): Promise<ReservationEntity[]>;
  public abstract isBookAvailable(bookId: number): Promise<boolean>;
  public abstract create(reservation: Reservation): void;
  public abstract markAsArchive(id: number): Promise<void>;
}
