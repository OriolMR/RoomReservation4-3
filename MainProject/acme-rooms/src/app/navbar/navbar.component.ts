import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { apiControllers, apiUrls, environment, localizacionUrls } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  @Input() titulo: string = '';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private crudService: RequestService
  ) {}

  navbarInfo: NavbarInfo[] = [];

  isHomePage(titulo: string) {
    if (titulo == 'Find your country') {
      return true;
    }
    return false;
  }

  showButton(titulo: string) {
    if (titulo.includes('Hello') || titulo.includes('Make a') || titulo.includes('Find your country') || titulo.includes('My reservations') || titulo.includes('Welcome')) {
      return true;
    }

    return false;
  }

  isUserPage(titulo: string) {
    if (titulo.includes('Hello')) {
      return true;
    }
    return false;
  }
  showReservationsButton(titulo: string) {
    if (titulo.includes('You are in')) {
      return false;
    }
    return true;
  }

  changeDisplay() { /*esto esta deshabilitado desde html: line 14 --> (click)="changeDisplay()" */
    this.isOpen = !this.isOpen;
    if (this.isOpen == true) {
      document.getElementById('homeTitle')?.classList.add('opened');
      document
        .getElementById('homeTitle')
        ?.classList.add('underline-animation-black');
    } else {
      document.getElementById('homeTitle')?.classList.remove('opened');
      document
        .getElementById('homeTitle')
        ?.classList.remove('underline-animation-black');
    }
  }
  goToAllRooms() {
    this.router.navigate(['view-all-rooms']);
  }
  ngOnInit(): void {
    this.crudService.get(`${environment.localizacionApiUrl}${apiControllers.country}${localizacionUrls.country.getAllCountries}`)
      .subscribe({next: (countries:any) => {
        countries.forEach((country:any) => {
          console.log(country);
          let offices = [];
          this.crudService.get(`${environment.localizacionApiUrl}${apiControllers.office}${localizacionUrls.office.getOfficesByCountryId}`, new HttpParams().append('countryId', country.id))
            .subscribe({next: (officesResponse:any) => {
              console.table(officesResponse);
              let newInfo = new NavbarInfo(country.id,country.name,officesResponse);
              this.navbarInfo.push(newInfo);
              console.table(newInfo);
              console.log(newInfo.officeName);
            }});
        });
      }, error: (error: Error) => {alert(`${error.name.toUpperCase()}: ${error.message}`)}
    });
    
    this.navbarInfo.sort((a,b) => {
      return a.countryName > b.countryName ? 1 : -1;
    })
  }
  
  goToLogin() {
    this.router.navigate(['login']);
  }
  /* FUNCIONES BACKEND */
  salir() {
    this.authenticationService.logout();
    this.goToLogin();
  }
}

export class NavbarInfo {
  id:number;
  countryName: string;
  officeName: any[];

  constructor(id:number, name: string, rooms: any[]) {
    this.id = id;
    this.countryName = name;
    this.officeName = rooms;
  }
}
