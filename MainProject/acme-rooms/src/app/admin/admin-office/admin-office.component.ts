import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Office } from 'src/app/models/office-models/office';
import { HttpParams } from '@angular/common/http';
import { LocalizacionesService } from '../../services/localizaciones.service';

@Component({
  selector: 'app-admin-office',
  templateUrl: './admin-office.component.html',
  styleUrls: ['./admin-office.component.css']
})
export class AdminOfficeComponent {
  constructor(private requestService: RequestService, private localizacionesService: LocalizacionesService) { }
  /*general*/
  officeName = "xxxx"
  officeId = -1
  officeCityId = -1
  /*crud */
  offices: (Office[]) = []
  oldOffice: (Office) = new Office()
  updatedOffice: (Office) = new Office()

  addOffice() {
    this.localizacionesService.createOffice(
      {
        "Name": this.officeName,
        "CityId": this.officeCityId
      })
      .subscribe({
        next() {
          alert(`You have successfully added the office.`);
        },
        error(err: Error) {
          alert(err.message)
        }
      });
  }
  getAllOffices() {
    this.localizacionesService.getAllOffices()
      .subscribe({
        next: (fetchedOffices: any[]) => {
          this.offices = fetchedOffices.map((office: any): any => {
            return {
              id: office.id,
              name: office.name,
              cityId: office.cityId
            };
          });
        },
      });    
  }
  getOfficeById(officeId: number) {
    this.localizacionesService.getOfficeById(officeId)
      .subscribe({
        next: (fetchedOffice: any) => {
          this.offices = [{
            id: fetchedOffice.id,
            name: fetchedOffice.name,
            cityId: fetchedOffice.cityId,
          }];
        },
      });
  }
  updateOffice(officeId: number) {
    /* getting old info*/
    this.localizacionesService.getOfficeById(officeId)
      .subscribe({
        next: (fetchedOffice: any) => {
          this.oldOffice = {
            id: fetchedOffice.id,
            name: fetchedOffice.name,
            cityId: fetchedOffice.cityId,
          };
        },
      });
    /*update database*/
    this.localizacionesService.updateOffice(
        {
          "Id": this.officeId,
          "Name": this.officeName,
          "CityId": this.officeCityId
        }).subscribe({
          next() {
          },
          error(err: Error) {
            alert(err.message)
          }
        });
    /*Get country with new info*/
    this.localizacionesService.getOfficeById(officeId)
      .subscribe({
        next: (fetchedOffice: any) => {
          this.updatedOffice = {
            id: fetchedOffice.id,
            name: fetchedOffice.name,
            cityId: fetchedOffice.cityId,
          };
        },
      });
  }
  deleteOffice(officeId: number) {
    alert(this.officeId);
    this.localizacionesService.deleteOffice(officeId)
      .subscribe({});
  }
}
