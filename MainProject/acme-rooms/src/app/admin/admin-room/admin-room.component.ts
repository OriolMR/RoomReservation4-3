import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Room } from 'src/app/models/room-models/room';
import { HttpParams } from '@angular/common/http';
import { LocalizacionesService } from '../../services/localizaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent {
  /*general */
  roomName = "xxxx"
  roomId = -1
  roomOfficeId = 16
  roomCapacity = 1

  /*crud */
  rooms: (Room[]) = []
  oldRoom: (Room) = new Room()
  updatedRoom: (Room) = new Room()
  constructor(private requestService: RequestService, private localizacionesService: LocalizacionesService) { }

  addedNewRoomPopUp(name: string): void {
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
      title: "New room added!",
      text: "Room name: " + name
    });
  }

  updatedRoomPopUp(id: number): void {
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
      title: "Room updated!",
      text: "Room ID: " + id
    });
  }

  /*CREATE*/
  addRoom() {
    this.localizacionesService.createRoom(
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
          //alert(err.message)
        }
      });
      this.addedNewRoomPopUp(this.roomName)
  }
  getAllRooms() {
    this.localizacionesService.getAllRooms()
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
    this.localizacionesService.getRoomById(id)
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
    this.localizacionesService.getRoomById(id)
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
    this.localizacionesService.updateRoom(
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
        this.updatedRoomPopUp(this.roomId)
    /*Get country with new info*/
    this.localizacionesService.getRoomById(id)
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
  deleteRoom(roomId: number) {
    //alert(this.roomId);
    this.localizacionesService.deleteRoom(roomId)
      .subscribe({});
  }

  confirmDeleteRoom(roomId: number){
    Swal.fire({
      title: "Are you sure you want to delete this Room?",
      text: "Room ID: " + roomId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRoom(roomId)
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
          title: "Room deleted!",
          text: "Room ID: " + roomId
        });
      }
    });
  }
}
