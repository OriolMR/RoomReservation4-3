import { Component, ElementRef } from '@angular/core';
import * as dayjs from 'dayjs';
import { FormsModule } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

import { OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Country } from '../../models/country';
import { City } from '../../models/city';
import { Office } from '../../models/office';
import { Room } from '../../models/room';
import { ReservationRegistrationForm } from '../../models/reservation-registration-form';
import { Reservation } from '../../models/reservation';
import { HttpParams } from '@angular/common/http';
import { LocalizacionesService } from '../../services/localizaciones.service';
import { ReservationsService } from '../../services/reservations.service';

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

  ngOnInit(): void {
    this.requestService
      .get(
        `${this.localizacionesService.getAllCountries}`
      )
      //.pipe(toArray())
      .subscribe({
        next: (countries: Country[]) => {
          this.countries = countries;
        },
      });
    this.onCountrySelected(this.selection.country.toString());
    this.onOfficeSelected(this.selection.office.toString());
  }

  postReservation(): void {
    this.requestService
      .post(
        `${this.reservationsService.createReservation}`,
        this.reservationRegistrationForm
      )
      .subscribe({
        next: (response: object) => {
          /*alert(JSON.stringify(response));*/
        },
        error: (err: Error) => {
          console.log(err.message);
        },
      });
  }

  validateReservation(): void {
    this.reservationRegistrationForm.userId = localStorage.getItem('userId')! as string;
    /*alert(JSON.stringify(this.reservationRegistrationForm));*/
    this.postReservation();
  }

  onCountrySelected(id: string): void {
    /*alert(id);*/
    if (id === 'any') {
      this.requestService
        .get(
          `${this.localizacionesService.getAllCities}`
        )
        .subscribe({
          next: (cities: City[]) => {
            this.cities = cities;
            /*alert(JSON.stringify(cities));*/
          },
        });
      this.requestService
        .get(
          `${this.localizacionesService.getAllOffices}`
        )
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
      this.requestService
        .get(
          `${this.localizacionesService.getCitiesByCountryId}`,
          new HttpParams().append('countryId', id)
        )
        .subscribe({
          next: (cities: City[]) => {
            this.cities = cities;
          },
          error(err: Error) {
            console.log(err.message);
          },
        });
      this.requestService
        .get(
          `${this.localizacionesService.getOfficesByCountryId}`,
          new HttpParams().append('countryId', id)
        )
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
      this.requestService
        .get(
          `${this.localizacionesService.getAllRooms}`
        )
        //.pipe(toArray())
        .subscribe({
          next: (rooms: Room[]) => {
            this.rooms = rooms;
            this.selection.room = this.rooms[0].id as number;
            this.reservationRegistrationForm.roomId = this.selection.room;
          },
        });
    } else {
      this.requestService
        .get(
          `${this.localizacionesService.getRoomsByOfficeId}`,
          new HttpParams().append('officeId', id)
        )
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
