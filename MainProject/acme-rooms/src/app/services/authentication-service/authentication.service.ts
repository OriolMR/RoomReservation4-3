import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'node_modules/rxjs';
import { tap, shareReplay } from 'node_modules/rxjs/operators';
import * as dayjs from 'dayjs';
import { UserServiceService } from 'src/app/services/user.service.service';
import { RequestService } from './../request.service';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7296/api';
  constructor(
    private httpClient: HttpClient,
    private userService: UserServiceService,
    private requestService: RequestService,
  ) { }

  authenticationUrls = {
    login: 'Login',
    register: 'Register',
    registerAdmin: 'RegisterAdmin',
  }

  

  private getExpiration(): dayjs.Dayjs {
    return dayjs(JSON.parse(localStorage.getItem('expiration') as string));
  }
  
  public isTokenStillValid(): boolean {
    return dayjs().isBefore(this.getExpiration());
  }
}
