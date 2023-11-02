import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { UserServiceService } from '../../user.service.service';
import { UserService } from '../../services/users.service';

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
