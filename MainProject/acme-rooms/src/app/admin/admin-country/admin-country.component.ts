import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { HttpParams } from '@angular/common/http';
import { Country } from 'src/app/models/country-models/country';
import { LocalizacionesService } from '../../services/localizaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.css'],
})
export class AdminCountryComponent {

  constructor(
    private requestService: RequestService,
    private localizacionesService: LocalizacionesService
  ) {}

  addedNewContryPopUp(name: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      showClass: {
        popup: '', // Establece la animación de salida como una cadena vacía
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'New country added!',
      text: 'Country: ' + name,
    });
  }

  updatedContryPopUp(name : string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      showClass: {
        popup: '', // Establece la animación de salida como una cadena vacía
      },
    });
    Toast.fire({
      icon: "success",
      title: "Country updated!",
      text: "Country: " + name
    });
  }

  confirmDeleteCountry(countryId: number){
    Swal.fire({
      title: "Are you sure you want to delete this City?",
      text: "City ID: " + countryId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCountry(countryId)
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
          title: "City deleted!",
          text: "City ID: " + countryId
        });
      }
    });
  }

  countryErrorPopUp(mensajeTitle : String, mensajeTexto :String): void {
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

  /* Inputs var */
  countryName = ""
  countryId = 0
  /* Add var */
  /* Get var */
  countries: Country[] = [];
  /* Update var 
  updatedCountry: (Country[]) = []*/
  oldCountry: Country = new Country();
  /* Delete var 
  deletedCountry: (Country) = new Country()*/

 isStringNumber(countryName: string): boolean {
  const num = parseInt(countryName, 10); //parseInt devuele NAN si la cadena no contiene nuemero
  return !isNaN(num);
}
 
  addCountry() {
    //alert(this.countryName);
    if (this.countryName == null || this.countryName == undefined
      || this.isStringNumber(this.countryName) == true || this.countryName.length <= 1) {
      this.countryErrorPopUp("Error, while creating a new country","Avoid special caracters and numbers")        
    } else {
      this.localizacionesService.createCountry(
        {
          "Name": this.countryName
        })
        .subscribe({
          next: (response: any) => {
            if (response !== null) {
              this.addedNewContryPopUp(this.countryName);
            }
          },
          error: (err: Error) => {
            this.countryErrorPopUp("Error!", " Tonterías no")
          }
        });
    }
  }

  getAllCountries() {
    //alert(this.countryId);
    this.localizacionesService.getAllCountries().subscribe({
      next: (fetchedCountries: any[]) => {
        this.countries = fetchedCountries.map((country: any): any => {
          return {
            id: country.id,
            name: country.name,
          };
        });
      },
    });
  }

  getCountryById(id: number) {
    this.localizacionesService.getCountryById(id).subscribe({
      next: (fetchedCountry: any) => {
        this.countries = [
          {
            id: fetchedCountry.id,
            name: fetchedCountry.name,
          },
        ];
      },
    });
  }

  updateCountry(id: number) {
    /* getting old info*/
    this.localizacionesService.getCountryById(id)
      .subscribe({
        next: (fetchedCountry: any) => {
          /*alert(JSON.stringify(fetchedCountry));*/
          this.oldCountry = {
            id: fetchedCountry.id,
            name: fetchedCountry.name,
          };          
        },
      });

    if (this.countryName == null || this.countryId == null || this.countryId == undefined || this.countryName == undefined
      || this.isStringNumber(this.countryName) == true || this.isStringNumber(this.countryId + "") == false
      || this.countryName.length <= 1) {

      this.countryErrorPopUp("Error, while updating the country", "Avoid special caracters and numbers")

    } else {
      this.localizacionesService
        .updateCountry({
          Id: this.countryId,
          Name: this.countryName,
        })
        .subscribe({
          next:() =>{
            this.updatedContryPopUp(this.countryName)
},
          error:(err: Error) =>{
            this.countryErrorPopUp("Error", "Backend Error")
          },
        });

    }

    /*update database*/
    

    /*Get country with new info*/
    this.getCountryById(id)
    
  }
  deleteCountry(id: number) {
    this.localizacionesService.deleteCountry(id).subscribe({});
    this.confirmDeleteCountry(id);
  }
}



