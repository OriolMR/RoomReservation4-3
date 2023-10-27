import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LockedDatesService {
  private apiUrl = 'https://localhost:5188/api';
  requestService: any;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong. Please, try again.');
  }

  lockedDatesUrls = {
    getAllLockedDates: 'GetAllLockedDates',
    getLockedDateById: 'GetLockedDateById',
    getLockedDateByYear: 'GetLockedDateByYear',
    getLockedDatesByMonth: 'GetLockedDatesByMonth',
    getLockedDatesByDay: 'GetLockedDatesByDay',
    createLockedDate: 'CreateLockedDate',
    updateLockedDate: 'UpdateLockedDate',
    deleteLockedDate: 'DeleteLockedDate',
  };

  getAllLockedDates(): Observable<any[]> {
    const url = `${this.apiUrl}/${this.lockedDatesUrls.getAllLockedDates}`;
    return this.requestService.get(url);
  }

  getLockedDateById(Id: number): Observable<any> {
    const url = `${this.apiUrl}/${this.lockedDatesUrls.getLockedDateById}/${Id}`;
    return this.requestService.get(url);
  }

  getLockedDateByYear(yearId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.lockedDatesUrls.getLockedDateByYear}/${yearId}`;
    return this.requestService.get(url);
  }

  getLockedDateByDay(dayId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.lockedDatesUrls.getLockedDatesByDay}/${dayId}`;
    return this.requestService.get(url);
  }

  getLockedDateByMonth(monthId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${this.lockedDatesUrls.getLockedDatesByMonth}/${monthId}`;
    return this.requestService.get(url);
  }

  createLockedDate(lockedDateData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.lockedDatesUrls.createLockedDate}`;
    return this.requestService.post(url, lockedDateData);
  }

  updateReservation(reservationId: number, reservationData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.lockedDatesUrls.updateLockedDate}/${reservationId}`;
    return this.requestService.put(url, reservationData);
  }

  deleteReservation(reservationId: number) {
    const url = `${this.apiUrl}/${this.lockedDatesUrls.deleteLockedDate}/'${reservationId}`;
    return this.requestService.delete(url, reservationId);
  }

  
}

