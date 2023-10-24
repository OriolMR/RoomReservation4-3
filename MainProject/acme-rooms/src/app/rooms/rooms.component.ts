import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { apiControllers, apiUrls, environment, localizacionUrls } from 'src/environments/environment';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {

  allRooms: Room[] = [];
  constructor (private crudService: RequestService) {

  }

  
  ngOnInit(): void {
    let officeName = "";
    this.crudService.get(`${environment.localizacionApiUrl}${apiControllers.room}${localizacionUrls.room.getAllRooms}`)
    .subscribe({next: (response: any) => {
      // let allRooms: Room[] = [];
      response.forEach((room: any) => {
        let officeName = "";
        this.crudService.get(`${environment.localizacionApiUrl}${apiControllers.office}${localizacionUrls.office.getOfficeById}`, 
          new HttpParams().append('id', room.officeId))
          .subscribe({next: (office: any) => {
            officeName = office.name;
            let newRoom = new Room(room.id,room.name, room.officeId, officeName);
            this.allRooms.push(newRoom);
          }, error: (error: Error) => {alert(`${error.name.toUpperCase()}: ${error.message}`)}
        });
        
      });
    }, error: (err: Error) => {alert(`${err.name}: ${err.message}`)}});
  }
}

class Room {
  id:number;
  name:string;
  officeId:number;
  officeName:string;

  constructor (id:number, name:string, officeId:number, officeName:string) {
    this.id = id;
    this.name = name;
    this.officeId = officeId;
    this.officeName = officeName;
  }
}
