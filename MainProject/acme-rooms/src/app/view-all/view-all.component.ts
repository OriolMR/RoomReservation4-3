import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import {
  environment,
  apiControllers,
  apiUrls,
  localizacionUrls,
} from '../../environments/environment';
import { Room } from '../models/room';
import { RoomExtendedDTO } from '../models/room-extended-dto';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent {
  rooms: RoomExtendedDTO[] = new Array<RoomExtendedDTO>();
  roomImages: string[] = [
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/97/10/4f/97104f781e9d6ead6396784293c8eb77.jpg',
    'https://distritooficina.com/wp-content/uploads/2018/12/57I9386-Editar-1024x683.jpg',
    'https://deligrop.co.jp/assets/images/index/bnr_company.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/61/30/e3/6130e3adf957d8c9f43d48fa194c5274.jpg',
    'https://i.pinimg.com/736x/8e/7d/bd/8e7dbdbf6bae48b3b63c637ffdce8bee.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
    'https://i.pinimg.com/736x/c5/7e/9a/c57e9ac7b836d2f822b0d72190b25080--show-rooms-meeting-rooms.jpg',
  ];
  roomDTOsByCountry: { [country: string]: RoomExtendedDTO[] } = {};
  countryKeys: string[] = [];
  userInput: string = "";

  constructor(private requestService: RequestService) {
    this.getAllRooms();
  }


  getAllRooms(): void {
    this.requestService
      .get(
        `${environment.localizacionApiUrl}${apiControllers.room}${localizacionUrls.room.getAllRoomExtendedDTOs}`
      )
      .subscribe({
        next: (fetchedRoomDTOs: RoomExtendedDTO[]) => {
          this.rooms = fetchedRoomDTOs;
          this.roomDTOsByCountry = fetchedRoomDTOs.reduce(

            (accumulatorObject: { [country: string]: RoomExtendedDTO[] }, room: RoomExtendedDTO) => {
              accumulatorObject[room.countryName] = accumulatorObject[room.countryName]?.concat(room) ?? [room];
              return accumulatorObject;

            },

            {}

          );
          this.countryKeys = Object.keys(this.roomDTOsByCountry);
          /*alert(JSON.stringify(this.roomDTOsByCountry));*/
        },

        complete: () => {
          this.filterRoom();
        },
        error: (err: Error) => {
          console.log(err.message);
        },
      });



  }
  public filterRoom(): void {
    //if (this.valorInput === "") {
    if (this.userInput === "") {
      return;
    } else {
      alert(this.userInput);
      this.rooms = ([] as RoomExtendedDTO[])
        .concat(
          this.rooms.filter((roomDTO) =>
            roomDTO.name.toLowerCase().startsWith(this.userInput.toLowerCase())
          )
        )
        .concat(//office
          this.rooms.filter((roomDTO) =>
            roomDTO.officeName.toLowerCase().startsWith(this.userInput.toLowerCase())
          )
        )
        .concat(//city
          this.rooms.filter((roomDTO) =>
            roomDTO.cityName.toLowerCase().startsWith(this.userInput.toLowerCase())
          )
        )
        .concat(//country
          this.rooms.filter((roomDTO) =>
            roomDTO.countryName.toLowerCase().startsWith(this.userInput.toLowerCase())
          )
        );
    }
  }
}
