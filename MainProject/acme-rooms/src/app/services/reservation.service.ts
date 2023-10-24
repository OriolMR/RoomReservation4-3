import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ReservationExtendedDTO } from '../models/reservation-extended-dto';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservation: Subject<ReservationExtendedDTO> =
    new Subject<ReservationExtendedDTO>();

  public reservation$: Observable<ReservationExtendedDTO> =
    this.reservation.asObservable();

  constructor() {}

  public setReservation(reservation: ReservationExtendedDTO): void {
    this.reservation.next(reservation);
  }
}
