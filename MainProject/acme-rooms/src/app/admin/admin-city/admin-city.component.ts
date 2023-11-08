import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { City } from 'src/app/models/city-models/city';
import { HttpParams } from '@angular/common/http';
import { LocalizacionesService } from '../../services/localizaciones.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.css']
})
export class AdminCityComponent {
  constructor(private requestService: RequestService, private localizacionesService: LocalizacionesService) { }
  /*general vars*/
  cityName = "xx"
  cityId = 32
  cityCountryId = 2
  /*crud var*/
  cities: (City[]) = []
  oldCity: (City) = new City()
  updatedCity: (City) = new City()

  addedNewCityPopUp(name: string): void {
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
      title: "New city added!",
      text: "City: " + name
    });
  }

  deletedCityPopUp(id: number): void {
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
      title: "Country deleted!",
      text: "City ID: " + id
    });
  }

  updatedCityPopUp(id: number): void {
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
      title: "City updated!",
      text: "City ID: " + id
    });
  }

  addCity() {
    this.localizacionesService.createCity(
      {
        "Name": this.cityName,
        "CountryId": this.cityCountryId
      })
      .subscribe({
        next() {
          //alert(`You have successfully added the city.`);
        },
        error(err: Error) {
          alert(err.message)
        }
      });
      this.addedNewCityPopUp(this.cityName)
    /* getByName */


  }
  getCityById(id: number) {
    this.localizacionesService.getCityById(id)
      .subscribe({
        next: (fetchedCity: any) => {
          this.cities = [{
            id: fetchedCity.id,
            name: fetchedCity.name,
            countryId: fetchedCity.countryId,
          }];
        },
      });
  }

  getAllCities() {
    this.localizacionesService.getAllCities()
      .subscribe({
        next: (fetchedCities: any[]) => {
          this.cities = fetchedCities.map((city: any): any => {
            return {
              id: city.id,
              name: city.name,
              countryId: city.countryId
            };
          });
        },
      });
  }

  updateCity() {
    /* getting old info*/
    this.localizacionesService.getCityById(this.cityId)
      .subscribe({
        next: (fetchedCity: any) => {
          this.oldCity = {
            id: fetchedCity.id,
            name: fetchedCity.name,
            countryId: fetchedCity.countryId,
          };
        },
      });
    /*update database*/
    this.localizacionesService.updateCity(
        {
          "Id": this.cityId,
          "Name": this.cityName,
          "CountryId": this.cityCountryId
        }).subscribe({
          next() {
          },
          error(err: Error) {
            alert(err.message)
          }
        });
        this.updatedCityPopUp(this.cityId)
    /*Get country with new info*/
    this.localizacionesService.getCityById(this.cityId)
      .subscribe({
        next: (fetchedCity: any) => {
          this.updatedCity = {
            id: fetchedCity.id,
            name: fetchedCity.name,
            countryId: fetchedCity.countryId,
          };
        },
      });
  }

  deleteCity(cityId: number) {
    //alert(this.cityId);
    this.localizacionesService.deleteCity(this.cityId)
      .subscribe({});
  }

  confirmDeleteCity(cityId: number){
    Swal.fire({
      title: "Are you sure you want to delete this City?",
      text: "City ID: " + cityId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCity(cityId)
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
          text: "City ID: " + cityId
        });
      }
    });
  }
}
