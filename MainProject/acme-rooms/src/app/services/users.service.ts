import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, shareReplay, tap, throwError } from 'rxjs';
import { __rest } from 'tslib';
import * as dayjs from 'dayjs';
import { RequestService } from './request.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7296/api';
  /*requestService: any;*/

  constructor(private http: HttpClient, private requestService: RequestService) { }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong. Please, try again.');
  }

  userUrls = {
    getAllUsers: 'GetAllUsers',
    getUserById: 'GetUserById',
    getUserByEmail: 'GetUserByEmail',
    updateUser: 'UpdateUser',
    updatePassword: 'UpdatePassword',
    login: 'login',
    logout: 'logout',
    register: 'register',
    
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

  updateUser(/*userId: number,*/ userData: any): Observable<any> {

    const url = `${this.apiUrl}/${this.userUrls.updateUser}`;
    /*const url = `${this.apiUrl}/${this.userUrls.updateUser}/${userId}`;*/
    return this.requestService.put(url, userData);
  }
  public login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/${this.userUrls.login}`;
    console.log(url);
    return this.requestService.post(url, new HttpParams().append(email, password)
    )
      .pipe(
        tap((res: any) => this.setSession(res, email)),
        shareReplay()
      );
  }

  updatePassword(username:String, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${this.userUrls.updatePassword}/${username}`;
    console.log(url);
    return this.requestService.put(url, userData);
  }

  sendEmailRequest(emailData: any): Observable<any>{
    const url = `https://localhost:7001/api/Email`;
    return this.requestService.post(url, emailData);
  }



  private setSession(authenticationResult: any, email: string): void {
    const expiration = dayjs().add(authenticationResult.expiration, 'minutes');

    localStorage.setItem('token', authenticationResult.token);
    localStorage.setItem('expiration', JSON.stringify(expiration.valueOf()));
    localStorage.setItem('userId', authenticationResult.userId);
    localStorage.setItem('email', email);
    localStorage.setItem('claims', authenticationResult.claims);
    localStorage.setItem('phoneNumber', authenticationResult.phoneNumber);
    /*alert(localStorage.getItem('phoneNumber'));*/
    this.setUserName(email);
    /*alert(JSON.stringify(authenticationResult));*/
    //alert(JSON.stringify(authenticationResult.claims));
  }

  setUserName(email: string) {
    this.requestService
      .get(
        `${this.setUserName}`,
        new HttpParams().append('email', email)
      )
      .subscribe({
        next: (user: any) => {
          localStorage.setItem('userName', user.userName);
          //this.userName = user.userName;
        },
      });
  }


  public logout(): void {
    localStorage.clear();
  }

  register(userData: any) {
    let url = `${this.apiUrl}/${this.userUrls.register}`
    return this.requestService.put(url, userData);

  }
  
  private getExpiration(): dayjs.Dayjs {
    return dayjs(JSON.parse(localStorage.getItem('expiration') as string));
  }

  public isTokenStillValid(): boolean {
    return dayjs().isBefore(this.getExpiration());
  }

  
}
