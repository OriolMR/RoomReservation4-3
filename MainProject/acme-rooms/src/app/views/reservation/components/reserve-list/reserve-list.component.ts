import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Component, Input, ElementRef, Renderer2, ViewChild, Output, EventEmitter
} from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { ReservationExtendedDTO } from '../../../../models/reservation-models/reservation-extended-dto';
import { ReservationsService } from '../../../../services/reservation-service/reservations.service';
import Swal from 'sweetalert2';
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

  constructor(private requestService: RequestService, private reservations: ReservationsService) { }

  deletedReservationPopUp(id: number): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      showClass: {
        popup: '', // Establece la animación de salida como una cadena vacía
      }
    });
    Toast.fire({
      icon: "success",
      title: "Rerservaton" + id + " deleted."
    });
  }

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
        this.reservations.deleteReservation(id),
        new HttpParams().append('id', `${id.toString()}`))
      .subscribe({
        next: (response) => {
          this.getReservas.emit();
          /*alert(`Eliminado correctamente. ${JSON.stringify(response)}`);*/
          this.deletedReservationPopUp(id);
        }
      });
  }
}
