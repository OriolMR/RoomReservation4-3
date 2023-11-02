import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Observable } from 'node_modules/rxjs';
import { UserService } from '../../services/users.service';

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

  constructor(private router: Router, private userService: UserService ) { } 
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
            alert(`You have successfully registred.`);
            self.goToLogin();
          }
          },
        error(err: Error) {
          console.log(err.message)
        }
      });
  }


}
