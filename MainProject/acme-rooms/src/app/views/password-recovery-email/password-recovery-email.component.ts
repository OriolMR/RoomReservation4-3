import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
/*import { send } from 'process';*/


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
    private router: Router, private userService: UserService
  ) { }


  popUp(email: String): void {
    const Toast = Swal.mixin({
      toast: true,
      width: 450,
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
    
  }

  errorPopUp(mensajeTitle: String, mensajeTexto: String): void {
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
      icon: 'error',
      title: '' + mensajeTitle,
      text: '' + mensajeTexto,
    });
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  

  clickSubmit(email: String) {
    /*this.router.navigate(['login']);*/
    console.log(this.user.email);
    this.sendPassword(email);
  }

  sendPassword(email: String) {
    alert("hello")
    this.userService.sendEmailRequest(email)
      .subscribe({        
        next: (response: any) => {
          console.log("dentro del susbcribe")
            this.popUp(this.user.email);
          }
        ,
        error: (err: Error) => {
          this.errorPopUp("Error!", " Tonterías no")
        }
      });
    }


  }
