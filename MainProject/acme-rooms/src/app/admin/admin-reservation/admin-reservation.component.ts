import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Reservation } from 'src/app/models/reservation-models/reservation';
import { HttpParams } from '@angular/common/http';
import { ReservationRegistrationForm } from '../../models/reservation-models/reservation-registration-form';
import { Country } from '../../models/country-models/country';
import { City } from '../../models/city-models/city';
import { Office } from '../../models/office-models/office';
import { Room } from '../../models/room-models/room';
import * as dayjs from 'dayjs';
import { ReservationExtendedDTO } from '../../models/reservation-models/reservation-extended-dto';
import { ReservationsService } from '../../services/reservation-service/reservations.service';
import Swal from 'sweetalert2';

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
  constructor(private requestService: RequestService, private reservationsService: ReservationsService) { }

  addedNewReservationPopUp(id: number): void {
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
      title: "New reservation added!",
      text: "Reservation ID: " + id
    });
  }
  
  updatedReservationPopUp(id: number): void {
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
      title: "Reservation updated!",
      text: "Reservation ID: " + id
    });
  }

  confirmDeleteCity(reservationId: number){
    Swal.fire({
      title: "Are you sure you want to delete this Reservation?",
      text: "Reservation ID: " + reservationId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteReservation(reservationId)
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
          title: "Reservation deleted!",
          text: "Reservation ID: " + reservationId
        });
      }
    });
  }

  reservationErrorPopUp(): void {
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
      icon: "error",
      title: "Error",
      text: ""
    });
  }

  /*CREATE*/
  addReservation() {
    this.requestService
      .post(
        `${this.reservationsService.createReservation}`,
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
          this.reservationErrorPopUp()
        },
      });
  }

  getAllReservations() {
    this.requestService
      .get(
        `${this.reservationsService.getAllReservations}`)
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
          this.reservationErrorPopUp()
        },
      });
  }
  getReservationByUserId(id: string) {
    this.requestService
      .get(
        `${this.reservationsService.getReservationsByUserId}`,
        new HttpParams().append('userId', `${id}`)
      )
      .subscribe({
        next: (fetchedReservations: ReservationExtendedDTO[]) => {
          this.llistaReservas = fetchedReservations
        },
        error: (err: Error) => {
          this.reservationErrorPopUp()
        },
      });

  }
  getReservationById(id: number) {
    this.requestService
      .get(
        `${this.reservationsService.getReservationById}`,
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
          this.reservationErrorPopUp()
        },
      });

  }

  updateReservationById(id: number) {
    /* comprobamos y obtenemos datos de la reserva */
    this.requestService
      .get(
        `${this.reservationsService.getReservationById}`,
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
          this.reservationErrorPopUp()
          alert("comprueba que es una reserva existente");
        },
      });

    this.updateThisReservation.date = this.reservationData.date;
    this.updateThisReservation.startTime = this.reservationData.startTime;
    this.updateThisReservation.endTime = this.reservationData.endTime;
    /* */
    this.requestService
      .put(
        `${this.reservationsService.updateReservation}`, {
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
  deleteReservation(reservationId: number) { }

}
