import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { apiControllers, apiUrls, environment, localizacionUrls } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent {
  constructor (
    private router: Router,
    private crudService: RequestService
  ) {}

  allRoomsInfo:allRoomsInfo[]= [];

  ngOnInit(): void {
    this.crudService.get(`${environment.localizacionApiUrl}${apiControllers.country}${localizacionUrls.country.getAllCountries}`)
      .subscribe({next: (countries:any) => {
        countries.forEach((country:any) => {
          this.crudService.get(`${environment.localizacionApiUrl}${apiControllers.office}${localizacionUrls.office.getOfficesByCountryId}`, new HttpParams().append('countryId', country.id))
            .subscribe({next:(officesResponse:any) => {
              let allRooms = new allRoomsInfo(country.id, country.name, officesResponse);
              this.allRoomsInfo.push(allRooms);
            }});
        });
      },error: (error:Error) => {alert(`${error.name.toUpperCase()}: ${error.message}`)}})
  }
}

export class allRoomsInfo {
  id:number;
  countryName: string;
  offices:any[];

  constructor (id:number, countryName:string, rooms:any[]) {
    this.id = id;
    this.countryName = countryName;
    this.offices = rooms;
  }
}
