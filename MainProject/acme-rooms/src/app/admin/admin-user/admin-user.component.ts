import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { UserServiceService } from '../../user.service.service';
import { UserService } from '../../services/users.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent {
  /*general*/
  formUser: (User) = new User();
  userId = 1
  updatedUser: (User) = new User();
  //userName = "xxxx"  
  //userEmail = "user@user.user"
  //userPassword = "User12345@"
  //userPhone = 654321234
  userPic = 'insertar imageeeeen'

  /*crud */
  users: (User[]) = [];
  oldUser: (User) = new User();
  constructor(private requestService: RequestService, private userService: UserService) { }

  addedNewUserPopUp(name: string): void {
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
      title: "user added!"
    });
  }

  deletedUserPopUp(id: number): void {
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
      title: "Country " + id + " deleted."
    });
  }

  updatedUserPopUp(id: number): void {
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
      title: "Country " + id + " updated!"
    });
  }


  /*CREATE*/
  addUser() { }

  getAllUsers() {
    this.requestService.get(`${this.userService.getAllUsers}`)
      .subscribe({
        next: (fetchedUsers: any[]) => {
          this.users = fetchedUsers.map((user: any): any => {
            return {
              id: user.id,
              name: user.name,
              email: user.email
            };
          });
        },
      });
  }
  getUserById() { }
  updateUser() { }
  deleteUser() { }
}
