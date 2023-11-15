import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  user = {
    password: '',
    repeatPassword: '', 
  }

  constructor(
    private router: Router
  ) {}
  
  popUp(): void {
    const Toast = Swal.mixin({
      toast: true,
      width: 450,
      position: "top-end",
      showConfirmButton: false,
      timer: 4500,
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
      title: "Password changed successfully",
      text: "You can login with your new password"
    });
    this.router.navigate(['login']);
  }
}
