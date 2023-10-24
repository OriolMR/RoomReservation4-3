import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';
import { Reservation } from 'src/app/models/reservation';
import { HttpParams } from '@angular/common/http';
import { ReservationRegistrationForm } from '../models/reservation-registration-form';
import { Country } from '../models/country';
import { City } from '../models/city';
import { Office } from '../models/office';
import { Room } from '../models/room';
import * as dayjs from 'dayjs';
import { ReservationExtendedDTO } from '../models/reservation-extended-dto';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent {

  reservationRegistrationForm!: ReservationRegistrationForm;
  llistaReservas!: ReservationExtendedDTO[];
  reservationData: (ReservationExtendedDTO) = new ReservationExtendedDTO;
  updateThisReservation: (ReservationExtendedDTO) = new ReservationExtendedDTO;

  reservaId !: number;
  countries: Country[] = [];
  cities: City[] = [];
  offices: Office[] = [];
  rooms: Room[] = [];
  userId!: string;
  reservas: (Reservation[]) = []
  reservation: (Reservation) = new Reservation()
  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addReservation() {
    this.requestService
      .post(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.createReservation}`,
        {
          "date": this.reservation.date,
          "startTime": this.reservation.startTime,
          "endTime": this.reservation.endTime,
          "roomId": this.reservation.roomId,
          "userId": this.reservation.userId
        }
      )
      .subscribe({
        next: (response: object) => {
          alert(JSON.stringify(response));
        },
        error: (err: Error) => {
          alert(err.message);
        },
      });
  }

  getAllReservations() {
    this.requestService
      .get(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getAllReservations}`)
      .subscribe({
        next: (fetchedReservations: ReservationExtendedDTO[]) => {
          const currentDate = dayjs(undefined, 'YYYY-MM-DD');
          this.llistaReservas = fetchedReservations
            .filter(
              (reservation) => {
                return dayjs(reservation.date).isSame(currentDate, 'date') ||
                  dayjs(reservation.date).isAfter(currentDate, 'date')
              }
            );
        },
        error: (err: Error) => {
          alert(err.message);
        },
      });
  }
  getReservationByUserId(id: string) {
    this.requestService
      .get(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getReservationsByUserId}`,
        new HttpParams().append('userId', `${id}`)
      )
      .subscribe({
        next: (fetchedReservations: ReservationExtendedDTO[]) => {
          this.llistaReservas = fetchedReservations
        },
        error: (err: Error) => {
          alert(err.message);
        },
      });

  }
  getReservationById(id: number) {
    this.requestService
      .get(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getReservationById}`,
        new HttpParams().append('id', `${id}`)
      )
      .subscribe({
        next: (fetchedReservations: any) => {
          this.llistaReservas = [{
            id: fetchedReservations.id,
            date: fetchedReservations.date,
            startTime: fetchedReservations.startTime,
            endTime: fetchedReservations.endTime,
            roomName: fetchedReservations.roomName,
            roomId: fetchedReservations.roomId,
            officeName: fetchedReservations.officeName,
            cityName: fetchedReservations.cityName,
            countryName: fetchedReservations.countryName,
            userId: fetchedReservations.userId
          }]
          alert("funciona");
        },
        error: (err: Error) => {
          alert(err.message);
        },
      });

  }

  updateReservationById(id: number) {
    /* comprobamos y obtenemos datos de la reserva */
    this.requestService
      .get(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.getReservationById}`,
        new HttpParams().append('id', id)
      )
      .subscribe({
        next: (fetchedReservations: any) => {
          this.updateThisReservation = {
            id: fetchedReservations.id,
            date: fetchedReservations.date,
            startTime: fetchedReservations.startTime,
            endTime: fetchedReservations.endTime,
            roomName: fetchedReservations.roomName,
            roomId: fetchedReservations.roomId,
            officeName: fetchedReservations.officeName,
            cityName: fetchedReservations.cityName,
            countryName: fetchedReservations.countryName,
            userId: fetchedReservations.userId
          }
          alert("funciona");
        },
        error: (err: Error) => {
          alert(err.message);
          alert("comprueba que es una reserva existente");
        },
      });

    this.updateThisReservation.date = this.reservationData.date;
    this.updateThisReservation.startTime = this.reservationData.startTime;
    this.updateThisReservation.endTime = this.reservationData.endTime;
    /* */
    this.requestService
      .put(
        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.updateReservation}`, {
          "id": this.updateThisReservation.id,
          "date": this.updateThisReservation.date,
          "startTime": this.updateThisReservation.startTime,
          "endTime": this.updateThisReservation.endTime,
          "roomId": this.updateThisReservation.roomId,
          "userId": this.updateThisReservation.userId
        }
      )
      .subscribe({
        next: (response) => {
          alert('Niceeeeee');
          alert(`${JSON.stringify(response)}`);
        },

        error: (err: Error) => {
          alert(`${JSON.stringify(err)}`);
          alert(`muy mal`);
        },
      });
  }
  deleteReservation() { }

}
