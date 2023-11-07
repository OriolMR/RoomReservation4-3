import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { HttpParams } from '@angular/common/http';
import { Country } from 'src/app/models/country-models/country';
import { LocalizacionesService } from '../../services/localizaciones.service';
//POP-UP
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.css'],
})
export class AdminCountryComponent {
  constructor(private requestService: RequestService, private localizacionesService: LocalizacionesService) { }

  addedNewContryPopUp(name: string): void {
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
      title: name + " added!"
    });
  }

  deletedContryPopUp(id: number): void {
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
      title: "Country " + id + " deleted."
    });
  }

  updatedContryPopUp(id: number): void {
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
      title: "Country " + id + " updated!"
    });
  }
  /* Inputs var */
  countryName = "xx"
  countryId = 18
  /* Add var */
  /* Get var */
  countries: (Country[]) = []
  /* Update var 
  updatedCountry: (Country[]) = []*/
  oldCountry: (Country) = new Country()
  /* Delete var 
  deletedCountry: (Country) = new Country()*/

  
 
  addCountry() {
    //alert(this.countryName);
    if (this.countryName !== null || this.countryName !== undefined || this.countryName !== '') {
      this.localizacionesService.createCountry(
        {
          "Name": this.countryName
        })
        .subscribe({
          next(response: any) {
            if (response !== null) {
              //alert(`You have successfully added the country.`);
            }
          },
          error(err: Error) {
            alert(err.message)
          }
        });
        this.addedNewContryPopUp(this.countryName);
    } else {
      alert("Please enter a valid name");
    }
  }

  getAllCountries() {
    //alert(this.countryId);
    this.localizacionesService.getAllCountries()
      .subscribe({
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

  getCountryById(id:number) {
    this.localizacionesService.getCountryById(id)
      .subscribe({
        next: (fetchedCountry: any) => {
          this.countries = [{
            id: fetchedCountry.id,
            name: fetchedCountry.name,
          }];
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
          this.updatedContryPopUp(id);
        },
      });



    /*update database*/
    this.localizacionesService.updateCountry(
         {
          "Id": this.countryId,
          "Name": this.countryName

        }).subscribe({
          next() {
          },
          error(err: Error) {
            alert(err.message)
          }
    });
    /*Get country with new info*/
    this.getCountryById(id)
  }
  deleteCountry(id: number) {
    //alert(this.countryId);
    this.localizacionesService.deleteCountry(id)
      .subscribe({ });
      this.deletedContryPopUp(id);
  }
}



