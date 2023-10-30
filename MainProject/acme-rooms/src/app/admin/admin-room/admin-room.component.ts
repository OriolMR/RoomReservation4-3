import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Room } from 'src/app/models/room';
import { HttpParams } from '@angular/common/http';
import { LocalizacionesService } from '../../services/localizaciones.service';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent {
  /*general */
  roomName = "xxxx"
  roomId = 1
  roomOfficeId = 16
  roomCapacity = 1

  /*crud */
  rooms: (Room[]) = []
  oldRoom: (Room) = new Room()
  updatedRoom: (Room) = new Room()
  constructor(private requestService: RequestService, private localizacionesService: LocalizacionesService) { }

  /*CREATE*/
  addRoom() {
    this.requestService.post(`${this.localizacionesService.createOffice}`,
      {
        "Name": this.roomName,
        "Capacity": this.roomCapacity,
        "OfficeId": this.roomOfficeId
      })
      .subscribe({
        next() {
          alert(`You have successfully added the room.`);
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
  getAllRooms() {
    this.requestService.get(`${this.localizacionesService.getAllRooms}`)
      .subscribe({
        next: (fetchedRooms: any[]) => {
          this.rooms = fetchedRooms.map((room: any): any => {
            return {
              id: room.id,
              name: room.name,
              capacity: room.capacity,
              officeId: room.officeId
            };
          });
        },
      });
  }
  getRoomById(id: number) {
    this.requestService.get(`${this.localizacionesService.getRoomById}`, new HttpParams().append("id", id))
      .subscribe({
        next: (fetchedRoom: any) => {
          this.rooms = [{
            id: fetchedRoom.id,
            name: fetchedRoom.name,
            capacity: fetchedRoom.capacity,
            officeId: fetchedRoom.officeId,
          }];
        },
      });
  }
  updateRoom(id: number) {
    /* getting old info*/
    this.requestService.get(`${this.localizacionesService.getRoomById}`, new HttpParams().append("id", id))
      .subscribe({
        next: (fetchedRoom: any) => {
          this.oldRoom = {
            id: fetchedRoom.id,
            name: fetchedRoom.name,
            capacity: fetchedRoom.capacity,
            officeId: fetchedRoom.officeId,
          };
        },
      });
    /*update database*/
    this.requestService
      .put(`${this.localizacionesService.updateRoom}`,
        {
          "Id": this.roomId,
          "Name": this.roomName,
          "Capacity": this.roomCapacity,
          "OfficeId": this.roomOfficeId
        }).subscribe({
          next() {
          },
          error(err: Error) {
            alert(err.message)
          }
        });
    /*Get country with new info*/
    this.requestService.get(`${this.localizacionesService.getRoomById}`, new HttpParams().append("id", id))
      .subscribe({
        next: (fetchedRoom: any) => {
          this.updatedRoom = {
            id: fetchedRoom.id,
            name: fetchedRoom.name,
            capacity: fetchedRoom.capacity,
            officeId: fetchedRoom.officeId,
          };
        },
      });
  }
  deleteRoom() {
    alert(this.roomId);
    this.requestService
      .delete(`${this.localizacionesService.deleteRoom}`,
      new HttpParams().append('id', `${this.roomId.toString()}`))
      .subscribe({});
  }
}
