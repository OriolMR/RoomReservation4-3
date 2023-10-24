import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls, localizacionUrls } from 'src/environments/environment';
import { City } from 'src/app/models/city';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.css']
})
export class AdminCityComponent {
  constructor(private requestService: RequestService) { }
  /*general vars*/
  cityName = "xx"
  cityId = 32
  cityCountryId = 2
  /*crud var*/
  cities: (City[]) = []
  oldCity: (City) = new City()
  updatedCity: (City) = new City()

  addCity() {
    this.requestService.post(`${environment.localizacionApiUrl}${apiControllers.city}${localizacionUrls.city.createCity}`,
      {
        "Name": this.cityName,
        "CountryId": this.cityCountryId
      })
      .subscribe({
        next() {
          alert(`You have successfully added the city.`);
        },
        error(err: Error) {
          alert(err.message)
        }
      });
    /* getByName */


  }
  getCityById(id: number) {
    this.requestService.get(`${environment.localizacionApiUrl}${apiControllers.city}${localizacionUrls.city.getCityById}`, new HttpParams().append("id", id))
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
    this.requestService.get(`${environment.localizacionApiUrl}${apiControllers.city}${localizacionUrls.city.getAllCities}`)
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
    this.requestService
      .get(`${environment.localizacionApiUrl}${apiControllers.city}${localizacionUrls.city.getCityById}`,
        new HttpParams().append('id', this.cityId))
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
    this.requestService
      .put(`${environment.localizacionApiUrl}${apiControllers.city}${localizacionUrls.city.updateCity}`,
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
    /*Get country with new info*/
    /*this.getCityById(this.cityId)*/
    this.requestService
      .get(`${environment.localizacionApiUrl}${apiControllers.city}${localizacionUrls.city.getCityById}`,
        new HttpParams().append('id', this.cityId))
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
  deleteCity() {
    alert(this.cityId);
    this.requestService
      .delete(`${environment.localizacionApiUrl}${apiControllers.city}${localizacionUrls.city.deleteCity}`,
      new HttpParams().append('id', `${this.cityId.toString()}`))
      .subscribe({});
  }
}
