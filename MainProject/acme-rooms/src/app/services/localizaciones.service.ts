import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { __rest } from 'tslib';
import { RequestService } from './request.service';
import { Room } from '../models/room-models/room';



@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {
  private apiUrl = 'https://localhost:7249/api';

  constructor(private http: HttpClient, private requestService: RequestService) { }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong. Please, try again.');
  }

  localizacionUrls = {
    country: {
      getAllCountries: 'GetAllCountries',
      getCountryById: 'GetCountryById',
      createCountry: 'CreateCountry',
      updateCountry: 'UpdateCountry',
      deleteCountry: 'DeleteCountry',
    },
    city: {
      getAllCities: 'GetAllCities',
      getCityById: 'GetCityById',
      getCitiesByCountryId: 'GetCitiesByCountryId',
      createCity: 'CreateCity',
      updateCity: 'UpdateCity',
      deleteCity: 'DeleteCity',
    },
    office: {
      getAllOffices: 'GetAllOffices',
      getOfficeById: 'GetOfficeById',
      getOfficesByCountryId: 'GetOfficesByCountryId',
      getOfficesByCityId: 'GetOfficesByCityId',
      createOffice: 'CreateOffice',
      updateOffice: 'UpdateOffice',
      deleteOffice: 'DeleteOffice',
    },
    room: {
      getAllRooms: 'GetAllRooms',
      getRoomById: 'GetRoomById',
      getRoomsByCountryId: 'GetRoomsByCountryId',
      getRoomsByCityId: 'GetRoomsByCityId',
      getRoomsByOfficeId: 'GetRoomsByOfficeId',
      getAllRoomExtendedDTOs: 'GetAllRoomExtendedDTOs',
      createRoom: 'CreateRoom',
      updateRoom: 'UpdateRoom',
      deleteRoom: 'DeleteRoom',
    },
  }

  
  countries = 'Countries';
  cities = 'Cities';
  offices = 'Offices';
  rooms = 'Rooms'

  // Assuming localizacionUrls is an object with properties, and getAllCountries is a property containing the path.

  // Countries

  getAllCountries(): Observable<any[]> {
    const url = `${this.apiUrl}/${this.countries}/${this.localizacionUrls.country.getAllCountries}`;
    return this.requestService.get(url);
  }

  getCountryById(countryId: number): Observable<any> {
    const url = `${this.apiUrl}/${this.countries}/${this.localizacionUrls.country.getCountryById}`;
    return this.requestService.get(url, new HttpParams().append('id', countryId));
  }

  createCountry(countryData: any): Observable<any>  {
    const url = `${this.apiUrl}/${this.countries}/${this.localizacionUrls.country.createCountry}`;
    return this.requestService.post(url, countryData);
  }

  updateCountry( countryData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.countries}/${this.localizacionUrls.country.updateCountry}`;
    return this.requestService.put(url, countryData);
  }

  deleteCountry(countryId: number) {
    const url = `${this.apiUrl}/${this.countries}/${this.localizacionUrls.country.deleteCountry}`;
    return this.requestService.delete(url, new HttpParams().append('id', countryId));
  }

  // Cities

  getAllCities(): Observable<any[]> {
    const url = `${this.apiUrl}/${this.cities}/${this.localizacionUrls.city.getAllCities}`;
    return this.requestService.get(url);
  }

  getCityById(cityId: string): Observable<any> {
    const url = `${this.apiUrl}/${this.cities}/${this.localizacionUrls.city.getCityById}/${cityId}`;
    return this.requestService.get(url);
  }

  getCitiesByCountryId(countryId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${this.cities}/${this.localizacionUrls.city.getCitiesByCountryId}?countryId=${countryId}`;
    return this.requestService.get(url);
  }

  createCity(cityData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.cities}/${this.localizacionUrls.city.createCity}`;
    return this.requestService.post(url,cityData);
  }

  updateCity(cityId: number, cityData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.cities}/${this.localizacionUrls.city.updateCity}/${cityId}`;
    return this.requestService.put(url,cityData);
  }

  deleteCity(cityId: number) {
    const url = `${this.apiUrl}/${this.cities}/${this.localizacionUrls.city.deleteCity}/${cityId}`;
    return this.requestService.delete(url);
  }

  // Offices

  getAllOffices(): Observable<any[]> {
    const url = `${this.apiUrl}/${this.offices}/${this.localizacionUrls.office.getAllOffices}`;
    return this.requestService.get(url);
  }

  getOfficeById(officeId: string): Observable<any> {
    const url = `${this.apiUrl}/${this.offices}/${this.localizacionUrls.office.getOfficeById}/${officeId}`;
    return this.requestService.get(url);
  }

  getOfficesByCountryId(countryId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${this.offices}/${this.localizacionUrls.office.getOfficesByCountryId}?countryId=${countryId}`;
    return this.requestService.get(url);
  }

  getOfficesByCityId(cityId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${this.offices}/${this.localizacionUrls.office.getOfficesByCityId}?cityId=${cityId}`;
    return this.requestService.get(url);
  }

  createOffice(officeData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.offices}/${this.localizacionUrls.office.createOffice}`;
    return this.requestService.post(url, officeData);
  }

  updateOffice(officeId: number, officeData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.offices}/${this.localizacionUrls.office.updateOffice}/${officeId}`;
    return this.requestService.put(url, officeData);
  }

  deleteOffice(officeId: number) {
    const url = `${this.apiUrl}/${this.offices}/${this.localizacionUrls.office.deleteOffice}/${officeId}`;
    return this.requestService.delete(url);
  }

  // Rooms

  getAllRooms(): Observable<any[]> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.getAllRooms}`;
    return this.requestService.get(url);
  }

  getRoomById(roomId: number): Observable<any> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.getRoomById}`;
    return this.requestService.get(url, new HttpParams().append('id', roomId));
  }

  getRoomsByCountryId(countryId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.getRoomsByCountryId}?countryId=${countryId}`;
    return this.requestService.get(url);
  }

  getRoomsByCityId(cityId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.getRoomsByCityId}?cityId=${cityId}`;
    return this.requestService.get(url);
  }

  getRoomsByOfficeId(officeId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.getRoomsByOfficeId}?officeId=${officeId}`;
    return this.requestService.get(url);
  }

  getAllRoomExtendedDTOs(): Observable<any[]> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.getAllRoomExtendedDTOs}`;
    return this.requestService.get(url);
  }

  createRoom(roomData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.createRoom}`;
    return this.requestService.post(url, roomData);
  }

  updateRoom(roomData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.updateRoom}`;
    return this.requestService.put(url, roomData);
  }

  deleteRoom(roomId: number): Observable<number> {
    const url = `${this.apiUrl}/${this.rooms}/${this.localizacionUrls.room.deleteRoom}`;
    return this.requestService.delete(url, new HttpParams().append('id', roomId));
  }




}



 










/*
this.requestService
  .post(
    `${environment.endpoint.apiUrl}${apiControllers.reservation}${apiUrls.reservation.createReservation}`,

    
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


        this.requestService
      .delete(`${environment.apiUrl}${apiControllers.country}${localizacionUrls.country.deleteCountry}`,
        new HttpParams().append('id', `${id}`))
      .subscribe({});
  }
 */


