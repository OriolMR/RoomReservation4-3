import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Observable } from 'node_modules/rxjs';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';
import { UserServiceService } from 'src/app/user.service.service';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-hello-user',
  templateUrl: './hello-user.component.html',
  styleUrls: ['./hello-user.component.css']
})
export class HelloUserComponent {
  userName: string = "";
  email: string = "";
  phone = localStorage.getItem('phoneNumber');
  userId = localStorage.getItem('userId');

  currentPassword: string = "";

  newPassword: string = "";
  confirmPassword: string = "";

  currentEmail: string = "";
  newEmail: string = "";
  confirmEmail: string = "";

  newPhone: string = "";

  constructor(private requestService: RequestService, private userServiceService: UserServiceService) {
    this.userName = localStorage.getItem('userName')!;
    this.email = localStorage.getItem('email')!;
    this.phone = localStorage.getItem('phoneNumber')!;
  }

  public mensaje() {
    alert("nice");
  }

  public modifyUser(): void {
    /*update database*/
    this.requestService
      .put(
        `${environment.apiUrl}${apiControllers.user}${apiUrls.user.updateUser}`,
        {
          UserName: this.userName,
          Email: this.email,
          Phone: "+1(555)125-4567"
        }
      )
      .subscribe({
        next: (response) => {          
          console.log(`${JSON.stringify(response)}`);
          this.userServiceService.setUserName(this.email);
        },

        error: (err: Error) => {
          console.log(`${JSON.stringify(err)}`);
        },
      });
  }

  public changePassword() {
    this.requestService
      .put(
        `${environment.apiUrl}${apiControllers.user}${apiUrls.user.updatePassword}?id=${this.userId}`,
        {         
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          newPasswordConfirmation: this.confirmPassword
        }
      )
      .subscribe({
        next: (response: any) => {
          console.log(`${JSON.stringify(response)}`);

        },

        error: (err: Error) => {
          console.log(`${JSON.stringify(err)}`);
        },
      });
  }
  public changeEmail() {
    //if (checkPassword(this.currentPassword)) {  //crear al back checkPassword(param)

    //  this.requestService
    //    .put(
    //      `${environment.apiUrl}${apiControllers.user}${apiUrls.user.updateUser}`,
    //      {
    //        userName: this.userName,
    //        phone: this.phone,
    //        email: this.newEmail
    //      }
    //    )
    //    .subscribe({
    //      next: (response: any) => {
    //        console.log(`${JSON.stringify(response)}`);

    //      },

    //      error: (err: Error) => {
    //        alert(`${JSON.stringify(err)}`);
    //      },
    //    });

    //} else {
    //  alert("Try again");
    //}
  }
  public updatePhone() {
    //if (checkPassword(this.currentPassword)) {  //crear al back checkPassword(param)

    //  this.requestService
    //    .put(
    //      `${environment.apiUrl}${apiControllers.user}${apiUrls.user.updateUser}`,
    //      {
    //        userName: this.userName,
    //        phone: this.phone,
    //        email: this.email
    //      }
    //    )
    //    .subscribe({
    //      next: (response: any) => {
    //        console.log(`${JSON.stringify(response)}`);

    //      },

    //      error: (err: Error) => {
    //        alert(`${JSON.stringify(err)}`);
    //      },
    //    });

    //} else {
    //  alert("Try again");
    //}
  }
}
