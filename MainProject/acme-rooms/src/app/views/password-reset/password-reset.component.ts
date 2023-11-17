import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/users.service';
import { UserServiceService } from '../../services/user.service.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  user = {
    name: '',
    password: '',
    repeatPassword: '', 
  }

  constructor(
    private router: Router, private requestService: RequestService, private userService: UserService, private userServiceService: UserServiceService
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

  //public changePassword() {
  //  this.requestService
  //    .put(
  //      `${this.userService.updatePassword}`,
  //      {
  //        currentPassword: "",
  //        newPassword: this.newPassword,
  //        newPasswordConfirmation: this.confirmPassword
  //      }
  //    )
  //    .subscribe({
  //      next: (response: any) => {
  //        console.log(`${JSON.stringify(response)}`);

  //      },

  //      error: (err: Error) => {
  //        console.log(`${JSON.stringify(err)}`);
  //      },
  //    });
  //}


}
