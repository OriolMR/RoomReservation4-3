import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Observable } from 'node_modules/rxjs';
import { RequestService } from './../../services/request.service';
import { UserServiceService } from 'src/app/user.service.service';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
    private userService: UserService
  ) { }

  loginFailedPopUp(): void{
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      showClass: {
        popup: '', // Establece la animación de salida como una cadena vacía
      }
    });
    Toast.fire({
      icon: "error",
      title: "Login failed!",
      text: "Check your emial and password"
    });
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToHome() {
    if (localStorage.getItem('claims')?.includes("Admin")) { 
      this.router.navigate(['adminProfile']);
    } else {
      this.router.navigate(['home']);
    }
  }

  login(){
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
