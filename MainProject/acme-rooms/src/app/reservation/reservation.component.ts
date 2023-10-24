import { Component, ElementRef, ViewChild } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment, apiControllers, apiUrls } from '../../environments/environment';
import { Reservation } from 'src/app/models/reservation';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as dayjs from 'dayjs';
import { OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  llistaReservas: ReservationExtendedDTO[] = new Array<ReservationExtendedDTO>();
  currentUserId: string = '';
  showNoReservaComponent: boolean = true;
  valorInput: string = "";

  constructor(private authenticationService: AuthenticationService, private requestService: RequestService
  ) {
  }

  ngOnInit() {
    this.idUsuario();
    this.getReservas();
  }

  idUsuario() {
    this.currentUserId = localStorage.getItem('userId')!;
  } //idUsuario

  getReservas() {
    this.requestService
      .get(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getReservationsByUserId}`,
        new HttpParams().append('userId', `${this.currentUserId}`)
    )
      .subscribe({
        next: (fetchedReservations: ReservationExtendedDTO[]) => {
          const currentDate = dayjs(undefined, 'YYYY-MM-DD');
          this.llistaReservas = fetchedReservations.filter((reservation) => {
            return (
              dayjs(reservation.date).isSame(currentDate, 'date') ||
              dayjs(reservation.date).isAfter(currentDate, 'date')
            );
          });
          this.llistaReservas.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        },
        complete: () => {
          this.showNoReservaComponent = this.llistaReservas.length === 0 ? true : false;
          this.filterReservations();
        }
      });
  }

  public filterReservations(): void {
    //if (this.valorInput === "") {
    if (this.valorInput === "") {
      return;
    } else {
      this.llistaReservas = ([] as ReservationExtendedDTO[])
        .concat(
          this.llistaReservas.filter((reservationDTO) =>
            reservationDTO.roomName.toLowerCase().startsWith(this.valorInput.toLowerCase())
          )
        )
        .concat(//office
          this.llistaReservas.filter((reservationDTO) =>
            reservationDTO.officeName.toLowerCase().startsWith(this.valorInput.toLowerCase())
          )
        )
        .concat(//city
          this.llistaReservas.filter((reservationDTO) =>
            reservationDTO.cityName.toLowerCase().startsWith(this.valorInput.toLowerCase())
          )
        )
        .concat(//country
          this.llistaReservas.filter((reservationDTO) =>
            reservationDTO.countryName.toLowerCase().startsWith(this.valorInput.toLowerCase())
          )
        )
        .concat(//id.toString()
          this.llistaReservas.filter((reservationDTO) =>
            reservationDTO.id.toString().toLowerCase().startsWith(this.valorInput.toLowerCase())
          )
      );
    }
  }
}
