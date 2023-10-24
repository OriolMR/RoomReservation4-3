import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { HttpParams } from '@angular/common/http';

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
  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addUser() { }

  getAllUsers() {
    this.requestService.get(`${environment.apiUrl}${apiControllers.user}${apiUrls.user.getAllUsers}`)
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
