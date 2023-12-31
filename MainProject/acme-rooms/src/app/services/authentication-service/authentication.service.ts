import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'node_modules/rxjs';
import { tap, shareReplay } from 'node_modules/rxjs/operators';
import * as dayjs from 'dayjs';
import { UserServiceService } from 'src/app/services/user.service.service';
import { RequestService } from './../request.service';
import { __rest } from 'tslib';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  

  constructor(
    private oidcSecurityService: OidcSecurityService
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

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}

