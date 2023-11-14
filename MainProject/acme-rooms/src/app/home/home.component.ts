import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Observable } from 'node_modules/rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

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

  constructor(private router: Router, private requestService: RequestService, private oidcSecurityService: OidcSecurityService) { } 

  goToLogin() {
    const authOptions = {
      customParams: {
        some: 'params',
      },
      urlHandler: () => {
        // ...
      },
      
    };
    this.router.navigate(['login-popup'])

    const configIdOrNull = " ";

      this.oidcSecurityService.authorize(configIdOrNull, authOptions);
  }

  registerSubmit() {
    let self = this;
    /*alert(`${this.user.name}, ${this.user.email} and ${this.user.password}`);*/
    this.requestService.post(`${/*environment.apiUrl}${apiControllers.authentication}${apiUrls.authentication.register*/""}`,
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
