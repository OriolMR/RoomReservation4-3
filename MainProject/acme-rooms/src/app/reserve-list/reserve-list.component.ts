import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, ElementRef, Renderer2, ViewChild, Output, EventEmitter
} from '@angular/core';
import { RequestService } from '../services/request.service';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css'],
})
export class ReserveListComponent {
  @ViewChild('reservationComponent', { static: true })
  reservationComponentRef!: ElementRef;
  //las reservas
  @Input()
  public reservation: ReservationExtendedDTO = new ReservationExtendedDTO();
  @Output("getReservas")
  getReservas: EventEmitter<any> = new EventEmitter();

  constructor(private requestService: RequestService) {}

  onDeleteClick() {
    alert(`${this.reservation.id}`);
    this.eliminarComponente();
    this.eliminarReserva(this.reservation.id);
  }

  eliminarComponente() {
    const parentElement =
      this.reservationComponentRef.nativeElement.parentElement;
    if (parentElement) {
      parentElement.removeChild(this.reservationComponentRef.nativeElement);
    }
  }

  eliminarReserva(id: number) {
    alert(JSON.stringify(new HttpParams().append('id', `${id.toString()}`)));
    this.requestService
      .delete(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.deleteReservation}`,
        new HttpParams().append('id', `${id.toString()}`))
      //   {
      //     id: this.reservation.id,
      //   }
      // )
      .subscribe({
        next: (response) => {
          this.getReservas.emit();
          alert(`Eliminado correctamente. ${JSON.stringify(response)}`);
        }
      });
  }
}
