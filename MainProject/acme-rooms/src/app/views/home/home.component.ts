import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Observable } from 'node_modules/rxjs';
import { UserService } from '../../services/users.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ReservationsService } from '../../services/reservation-service/reservations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user = {
    name: "",
    email: "",
    password: ""
  }

  constructor(private router: Router, private userService: UserService, private reservations: ReservationsService) { }

  registerFailedPopUp(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
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
      title: "Register failed!"
    });
  }

  registredPopUp(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      showClass: {
        popup: '', // Establece la animación de salida como una cadena vacía
      }
    });
    Toast.fire({
      icon: "success",
      title: "You have successfully registred"
    });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  registerSubmit() {
    let self = this;
    this.userService.register(
      {
        "UserName": this.user.name,
        "Password": this.user.password,
        "Email": this.user.email,
        "Phone": "000000000"
      })
      .subscribe({
        next(response: any) {
          alert(JSON.stringify(response))
          if (response["body"]) {
            this.registredPopUp();
            self.goToLogin();
          }
        },
        error(err: Error) {
          console.log(err.message)
          this.registerFailedPopUp();
        }
      });
  }
}
