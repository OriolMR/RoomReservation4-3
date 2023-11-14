import { Component, ElementRef } from '@angular/core';
import * as dayjs from 'dayjs';
import { FormsModule } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Country } from '../../models/country-models/country';
import { City } from '../../models/city-models/city';
import { Office } from '../../models/office-models/office';
import { Room } from '../../models/room-models/room';
import { ReservationRegistrationForm } from '../../models/reservation-models/reservation-registration-form';
import { Reservation } from '../../models/reservation-models/reservation';
import { LocalizacionesService } from '../../services/localizaciones.service';
import { ReservationsService } from '../../services/reservation-service/reservations.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  public reservationRegistrationForm: ReservationRegistrationForm;
  selection: {
    country: 'any' | number;
    office: 'any' | number;
    room: 'any' | number;
  } = {
    country: 'any',
    office: 'any',
    room: 'any',
  };
  countries: Country[] = [];
  cities: City[] = [];
  offices: Office[] = [];
  rooms: Room[] = [];

  constructor(private requestService: RequestService, private localizacionesService: LocalizacionesService, private reservationsService: ReservationsService) {
    this.reservationRegistrationForm = new ReservationRegistrationForm();
  }

  newReservationPopUp(): void {
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
      title: "Room reserved!"
    });
  }
  registerFailedPopUp(): void {
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
      title: "Failed to make a reservation."
    });
  }


  ngOnInit(): void {  
    this.localizacionesService.getAllCountries()
      .subscribe({
        next: (countries: Country[]) => {
          this.countries = countries;
        },
      });
    this.onCountrySelected(this.selection.country.toString());
    this.onOfficeSelected(this.selection.office.toString());
  }

  postReservation(): void {
    console.log(this.reservationRegistrationForm);
    this.reservationsService.createReservation(
        this.reservationRegistrationForm
      )
      .subscribe({
        next: (response: object) => {
          /*alert(JSON.stringify(response));*/
          this.newReservationPopUp();
        },
        error: (err: Error) => {
          console.log(err.message);
          this.registerFailedPopUp();
        },
      });
  }

  validateReservation(): void {
    this.reservationRegistrationForm.userId = localStorage.getItem('userId')! as string;
    /*alert(JSON.stringify(this.reservationRegistrationForm));*/
    this.postReservation();
  }

  onCountrySelected(id: string): void {
    console.log('Pais seleccionado: ' + this.selection.country.toString());
    if (id === 'any') {
      this.localizacionesService.getAllCities()
        .subscribe({
          next: (cities: City[]) => {
            this.cities = cities;
          },
        });
      this.localizacionesService.getAllOffices()
        .subscribe({
          next: (offices: Office[]) => {
            this.offices = offices;
          },
          error(err: Error) {
            console.log(err.message);
          },
        });
      this.selection.office = 'any';
      this.onOfficeSelected('any');
    } else {
      this.localizacionesService.getCitiesByCountryId(id)      
        .subscribe({
          next: (cities: City[]) => {
            this.cities = cities;
          },
          error(err: Error) {
            console.log(err.message);
          },
        });
      this.localizacionesService.getOfficesByCountryId(id)
      .subscribe({
          next: (offices: Office[]) => {
            this.offices = offices;
          },
          error(err: Error) {
            console.log(err.message);
          },
        });
    }
  }

  onOfficeSelected(id: string): void {
    if (id === 'any') {
      this.localizacionesService.getAllRooms()      
        .subscribe({
          next: (rooms: Room[]) => {
            this.rooms = rooms;
            this.selection.room = this.rooms[0].id as number;
            this.reservationRegistrationForm.roomId = this.selection.room;
          },
        });
    } else {
      this.localizacionesService.getRoomsByOfficeId(id)      
        .subscribe({
          next: (rooms: Room[]) => {
            this.rooms = rooms;
            this.selection.room = this.rooms[0].id as number;
            this.reservationRegistrationForm.roomId = this.selection.room;
          },
        });
    }
  }

  onRoomSelected(id: string): void {
    this.reservationRegistrationForm.roomId = parseInt(id);
    /*alert(`${this.reservationRegistrationForm.roomId}`);*/
  }
}
