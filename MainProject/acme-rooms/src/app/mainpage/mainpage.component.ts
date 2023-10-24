import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import {
  environment,
  apiControllers,
  apiUrls,
  localizacionUrls,
} from '../../environments/environment';
import { Room } from '../models/room';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent {
  rooms: any[] = [];
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

  constructor(private requestService: RequestService) {
    this.getRooms();
  }

  getRooms(): void {
    this.requestService
      .get(
        `${environment.localizacionApiUrl}${apiControllers.room}${localizacionUrls.room.getAllRooms}`
      )
      //.pipe(toArray())
      .subscribe({
        next: (fetchedRooms: any[]) => {
          this.rooms = fetchedRooms.map((room: any, index: number): any => {
            return {
              id: room.id,
              name: room.name,
              officeId: room.officeId,
              img: this.roomImages[index],
            };
          });
        },
      });
  }

  goToDetails(id: number) {
    alert(`Va a los detalles de ${id}`);
  }
}
