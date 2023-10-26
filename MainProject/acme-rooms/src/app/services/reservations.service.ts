import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { __rest } from 'tslib';



@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = 'https://localhost:5188/api';
  requestService: any;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong. Please, try again.');
  }

   reservationUrls = {
    getAllReservations: 'GetAllReservations',
    getReservationById: 'GetReservationById',
    getReservationsByCountryId: 'GetReservationsByCountryId',
    getReservationsByCityId: 'GetReservationsByCityId',
    getReservationsByOfficeId: 'GetReservationsByOfficeId',
    getReservationsByRoomId: 'GetReservationsByRoomId',
    getReservationsByUserId: 'GetReservationsByUserId',
    createReservation: 'CreateReservation',
    updateReservation: 'UpdateReservation',
    deleteReservation: 'DeleteReservation'
  }

  getAllReservations(): Observable<any[]> {
    const url = `${this.apiUrl}/${this.reservationUrls.getAllReservations}`;
    return this.requestService.get(url);
  }

  getReservationById(countryId: number): Observable<any> {
    const url = `${this.apiUrl}/${this.reservationUrls.getReservationById}/${countryId}`;
    return this.requestService.get(url);
  }

  getReservationsByCountryId(countryId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.reservationUrls.getReservationsByCountryId}/${countryId}`;
    return this.requestService.get(url);
  }
  getReservationsByCityId(cityId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.reservationUrls.getReservationsByCityId}/${cityId}`;
    return this.requestService.get(url);
  }

  getReservationsByOfficeId(officeId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.reservationUrls.getReservationsByOfficeId}/${officeId}`;
    return this.requestService.get(url);
  }

  getReservationsByRoomId(roomId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.reservationUrls.getReservationsByRoomId}/${roomId}`;
    return this.requestService.get(url);
  }

  getReservationsByUserId(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.reservationUrls.getReservationsByUserId}/${userId}`;
    return this.requestService.get(url);
  }

  createReservation(reservationData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.reservationUrls.createReservation}`;
    return this.requestService.post(url, reservationData);
  }

  updateReservation(reservationId: number, reservationData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.reservationUrls.updateReservation}/${reservationId}`;
    return this.requestService.put(url, reservationData);
  }

  deleteReservation(reservationId: number) {
    const url = `${this.apiUrl}/${this.reservationUrls.deleteReservation}/'${reservationId}`;
    return this.requestService.delete(url, reservationId);
  }
}
