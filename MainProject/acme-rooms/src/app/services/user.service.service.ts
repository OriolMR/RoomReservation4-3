import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { HttpParams } from '@angular/common/http';
import { UserService } from './../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  //private userName: string = '';

  constructor(private requestService: RequestService, private userService: UserService) { }

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

  // getUserName(): string {
  //   return this.userName;
  //   return localStorage.getItem('userName')!;
  // }
}
