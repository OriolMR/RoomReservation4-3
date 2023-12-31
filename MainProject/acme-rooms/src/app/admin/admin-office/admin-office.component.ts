import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Office } from 'src/app/models/office-models/office';
import { HttpParams } from '@angular/common/http';
import { LocalizacionesService } from '../../services/localizaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-office',
  templateUrl: './admin-office.component.html',
  styleUrls: ['./admin-office.component.css']
})
export class AdminOfficeComponent {
  constructor(private requestService: RequestService, private localizacionesService: LocalizacionesService) { }
  /*general*/
  officeName = ""
  officeId = -1
  officeCityId = -1
  /*crud */
  offices: (Office[]) = []
  oldOffice: (Office) = new Office()
  updatedOffice: (Office) = new Office()

  addedNewOfficePopUp(name: string): void {
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
      title: "New office added!",
      text: "Office: " + name
    });
  }

  updatedOfficePopUp(id: number): void {
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
      title: "Office updated!",
      text: "Office ID: " + id
    });
  }

  confirmDeleteOffice(officeId: number) {
    Swal.fire({
      title: "Are you sure you want to delete this Office?",
      text: "Office ID: " + officeId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOffice(officeId)
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
          title: "Office deleted!",
          text: "Office ID: " + officeId
        });
      }
    });
  }

  OfficeErrorPopUp(mensajeTitle: String, mensajeTexto: String): void {
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
      icon: 'error',
      title: '' + mensajeTitle,
      text: '' + mensajeTexto,
    });
  }

  isStringNumber(countryName: string): boolean {
    const num = parseInt(countryName, 10); //parseInt devuele NAN si la cadena no contiene nuemero
    return !isNaN(num);
  }

  addOffice() {
    if (this.officeName == null || this.officeName == undefined
      || this.isStringNumber(this.officeName) == true || this.officeName.length <= 1) {
      this.OfficeErrorPopUp("Error, while creating a new office", "Avoid special caracters and numbers");
    } else {
      this.localizacionesService.createOffice(
        {
          "Name": this.officeName,
          "CityId": this.officeCityId
        })
        .subscribe({
          next: () => {
            this.addedNewOfficePopUp(this.officeName)
          },
          error: (err: Error) => {
            this.OfficeErrorPopUp("Error!","Error BackEnd");
          }
        });
    }
    
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
    this.localizacionesService.getOfficeById(this.officeId)
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

    if (this.officeName == null || this.officeId == null || this.officeCityId == undefined || this.officeName == undefined
      || this.isStringNumber(this.officeName) == true || this.isStringNumber(this.officeId + "") == false
      || this.isStringNumber(this.officeCityId + "") == false || this.officeName.length <= 1) {

      this.OfficeErrorPopUp("Error, while updating the office", "Avoid special caracters and numbers")

    } else {
      this.localizacionesService.updateOffice(
        {
          "Id": this.officeId,
          "Name": this.officeName,
          "CityId": this.officeCityId
        }).subscribe({
          next: () => {
            this.updatedOfficePopUp(officeId);
          },
          error: (err: Error) => {
            this.OfficeErrorPopUp("Error!", "Error BackEnd");
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
  }

  deleteOffice(officeId: number) {
    //alert(this.officeId);
    this.localizacionesService.deleteOffice(officeId)
      .subscribe({});
  }

  
}
