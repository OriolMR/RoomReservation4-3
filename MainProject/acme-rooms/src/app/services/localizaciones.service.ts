//import { Injectable } from '@angular/core';
//import { HttpClient, HttpParams } from '@angular/common/http';
//import { Observable } from 'rxjs';
//import { __rest } from 'tslib';

//@Injectable({
//  providedIn: 'root'
//})
//export class LocalizacionesService {
//  private getLocalizaciones: string = '${ environment..localizacionUrls }${ apiControllers.country }${ localizacionUrls.country.getAllCountries }`
//}

//  constructor(private httpClient: HttpClient) { }




//this.requestService
//  .get(
//    `${environment.endpoint.localizacionUrls}${apiControllers.country}${localizacionUrls.country.getAllCountries}`
//)
//this.requestService
//  .post(
//    `${environment.endpoint.apiUrl}${apiControllers.reservation}${apiUrls.reservation.createReservation}`,


//    this.requestService
//      .put(
//        `${environment.apiUrl}${apiControllers.reservation}${apiUrls.reservation.updateReservation}`,
//        {
//          id: this.reservationData.id,
//          date: this.reservationData.date,
//          startTime: this.reservationData.startTime,
//          endTime: this.reservationData.endTime,
//          roomId: this.reservationData.roomId,
//          userId: this.reservationData.userId
//        }
//    )


//        this.requestService
//      .delete(`${environment.apiUrl}${apiControllers.country}${localizacionUrls.country.deleteCountry}`,
//        new HttpParams().append('id', `${id}`))
//      .subscribe({});
//  }


//export const localizacionUrls = {
//  country: {
//    getAllCountries: 'GetAllCountries',
//    getCountryById: 'GetCountryById',
//    createCountry: 'CreateCountry',
//    updateCountry: 'UpdateCountry',
//    deleteCountry: 'DeleteCountry',
//  },
//  city: {
//    getAllCities: 'GetAllCities',
//    getCityById: 'GetCityById',
//    getCitiesByCountryId: 'GetCitiesByCountryId',
//    createCity: 'CreateCity',
//    updateCity: 'UpdateCity',
//    deleteCity: 'DeleteCity',
//  },
//  office: {
//    getAllOffices: 'GetAllOffices',
//    getOfficeById: 'GetOfficeById',
//    getOfficesByCountryId: 'GetOfficesByCountryId',
//    getOfficesByCityId: 'GetOfficesByCityId',
//    createOffice: 'CreateOffice',
//    updateOffice: 'UpdateOffice',
//    deleteOffice: 'DeleteOffice',
//  },
//  room: {
//    getAllRooms: 'GetAllRooms',
//    getRoomById: 'GetRoomById',
//    getRoomsByCountryId: 'GetRoomsByCountryId',
//    getRoomsByCityId: 'GetRoomsByCityId',
//    getRoomsByOfficeId: 'GetRoomsByOfficeId',
//    getAllRoomExtendedDTOs: 'GetAllRoomExtendedDTOs',
//    createRoom: 'CreateRoom',
//    updateRoom: 'UpdateRoom',
//    deleteRoom: 'DeleteRoom',
//  },
//}
