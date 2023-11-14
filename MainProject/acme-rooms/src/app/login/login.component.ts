import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'node_modules/rxjs';
//import {
//  environment,
//  apiControllers,
//  apiUrls,
//} from 'src/environments/environment';
import { UserServiceService } from 'src/app/user.service.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService, private userService: UserService
  ) { }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToHome() {
    if (localStorage.getItem('claims')?.includes("Admin")) { 
      this.router.navigate(["http://localhost:5000"]);
    } else {
      this.router.navigate(['home']);
    }
  }

  login() {
    this.userService.login(this.user.email, this.user.password)
      .subscribe({
        next: (response: any) => {
          if (response['token']) {
            //alert(`You have successfully logged in as ${this.user.email}.`);            
            this.goToHome();
          }
        },
        error(err: Error) {
          console.log(err.message);
          /*this.loginFailedPopUp();*/
        },
      });
  }


  
}
