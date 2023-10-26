import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { __rest } from 'tslib';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7296/api';
  requestService: any;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong. Please, try again.');
  }

  export const userUrls = {
    getAllUsers: 'GetAllUsers',
    getUserById: 'GetUserById',
    getUserByEmail: 'GetUserByEmail',
    updateUser: 'UpdateUser',
    updatePassword: 'UpdatePassword',
  }

  getAllUsers(): Observable<any[]> {
    const url = `${this.apiUrl}/${this.userUrls.getAllUsers}`;
    return this.requestService.get(url);
  }

  getUserById(countryId: number): Observable<any> {
    const url = `${this.apiUrl}/${this.userUrls.getUserById}/${countryId}`;
    return this.requestService.get(url);
  }

  getUserByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}/${this.userUrls.getUserByEmail}/${email}`;
    return this.requestService.get(url);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.userUrls.updateUser}/${userId}`;
    return this.requestService.put(url, userData);
  }

}
