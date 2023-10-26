import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { __rest } from 'tslib';



@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {
  private apiUrl = 'https://localhost:7281/api';
    requestService: any;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong. Please, try again.');
  }

  export const localizacionUrls = {
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

  // Assuming localizacionUrls is an object with properties, and getAllCountries is a property containing the path.

  // Countries

  getAllCountries(): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.country.getAllCountries}`;
    return this.requestService.get(url);
  }

  getCountryById(countryId: number): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.country.getCountryById}/${countryId}`;
    return this.requestService.get(url);
  }

  createCountry(countryData: any): Observable<any>  {
    const url = `${this.apiUrl}/${localizacionUrls.country.createCountry}`;
    return this.requestService.post(url, countryData);
  }

  updateCountry(countryId: number, countryData: any): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.country.updateCountry}/${countryId}`;
    return this.requestService.put(url, countryData);
  }

  deleteCountry(countryId: number) {
    const url = `${this.apiUrl}/${localizacionUrls.country.deleteCountry}`;
    return this.requestService.delete(url, countryId);
  }

  // Cities

  getAllCities(): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.city.getAllCities}`;
    return this.requestService.get(url);
  }

  getCityById(cityId: string): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.city.getCityById}/${cityId}`;
    return this.requestService.get(url);
  }

  getCitiesByCountryId(countryId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.city.getCitiesByCountryId}/${countryId}`;
    return this.requestService.get(url);
  }

  createCity(cityData: any): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.city.createCity}`;
    return this.requestService.post(url,cityData);
  }

  updateCity(cityId: number, cityData: any): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.city.updateCity}/${cityId}`;
    return this.requestService.put(url,cityData);
  }

  deleteCity(cityId: number) {
    const url = `${this.apiUrl}/${localizacionUrls.city.deleteCity}/${cityId}`;
    return this.requestService.delete(url, cityId);
  }

  // Offices

  getAllOffices(): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.office.getAllOffices}`;
    return this.requestService.get(url);
  }

  getOfficeById(officeId: string): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.office.getOfficeById}/${officeId}`;
    return this.requestService.get(url);
  }

  getOfficesByCountryId(countryId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.office.getOfficesByCountryId}/${countryId}`;
    return this.requestService.get(url);
  }

  createOffice(officeData: any): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.office.createOffice}`;
    return this.requestService.post(url, officeData);
  }

  updateOffice(officeId: number, officeData: any): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.office.updateOffice}/${officeId}`;
    return this.requestService.put(url, officeData);
  }

  deleteOffice(officeId: number) {
    const url = `${this.apiUrl}/${localizacionUrls.office.deleteOffice}`;
    return this.requestService.delete(url,officeId);
  }

  // Rooms

  getAllRooms(): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.room.getAllRooms}`;
    return this.requestService.get(url);
  }

  getRoomById(roomId: string): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.room.getRoomById}/${roomId}`;
    return this.requestService.get(url);
  }

  getRoomsByCountryId(countryId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.room.getRoomsByCountryId}/${countryId}`;
    return this.requestService.get(url);
  }

  getRoomsBycityId(cityId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.room.getRoomsByCityId}/${cityId}`;
    return this.requestService.get(url);
  }

  getRoomsByOfficeId(cityId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${localizacionUrls.room.getRoomsByOfficeId}/${cityId}`;
    return this.requestService.get(url);
  }

  createRoom(roomData: any): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.room.createRoom}`;
    return this.requestService.post(url, roomData);
  }

  updateRoom(roomId: number, roomData: any): Observable<any> {
    const url = `${this.apiUrl}/${localizacionUrls.room.updateRoom}/${roomId}`;
    return this.requestService.put(url, roomData);
  }

  deleteRoom(): Observable<number> {
    const url = `${this.apiUrl}/${localizacionUrls.room.deleteRoom}`;
    return this.requestService.delete(url);
  }














}



 











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


export const localizacionUrls = {
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

function throwError(arg0: string) {
    throw new Error('Function not implemented.');
}
