import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import {
  environment,
  apiControllers,
  apiUrls,
} from '../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  //private userName: string = '';

  constructor(private requestService: RequestService) {}

  setUserName(email: string) {
    this.requestService
      .get(
        `${environment.apiUrl}${apiControllers.user}${apiUrls.user.getUserByEmail}`,
        new HttpParams().append('email', email)
      )
      .subscribe({
        next: (user: any) => {
          localStorage.setItem('userName', user.userName);
          //this.userName = user.userName;
        },
      });
  }

  // getUserName(): string {
  //   return this.userName;
  //   return localStorage.getItem('userName')!;
  // }
}
