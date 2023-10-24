import { Component, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { environment,apiControllers,apiUrls} from 'src/environments/environment';
import { RequestService } from '../services/request.service';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  @Input() reservationData!: ReservationExtendedDTO;

  constructor(
    private reservationService: ReservationService,
    private requestService: RequestService
  ) {}

  public submit(): void {
    /*update database*/
    alert(`${JSON.stringify(this.reservationData)}`);
    this.requestService
      .put(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.updateReservation}`,
        {
          id: this.reservationData.id,
          date: this.reservationData.date,
          startTime: this.reservationData.startTime,
          endTime: this.reservationData.endTime,
          roomId: this.reservationData.roomId,
          userId: this.reservationData.userId
        }
      )
      .subscribe({
        next: (response) => {
          alert(`${JSON.stringify(response)}`);
        },

        error: (err: Error) => {
          alert(`${JSON.stringify(err)}`);
        },
      });
  }

  public modifyReservation(): void {
    this.submit();

    this.reservationService.setReservation(this.reservationData);
  }

  //-------------------------

  showPopup: boolean = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
