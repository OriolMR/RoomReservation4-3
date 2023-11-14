import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery-email',
  templateUrl: './password-recovery-email.component.html',
  styleUrls: ['./password-recovery-email.component.css']
})
export class PasswordRecoveryEmailComponent {
  user = {
    email: '', 
  }

  constructor(
    private router: Router
  ) {}
  
  popUp(email: String): void {
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
      title: "Email sent successfully",
      text: "Email: " + email
    });
    this.router.navigate(['login']);
  }
}
