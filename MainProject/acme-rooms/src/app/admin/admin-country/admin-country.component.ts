import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { HttpParams } from '@angular/common/http';
import { Country } from 'src/app/models/country-models/country';
import { LocalizacionesService } from '../../services/localizaciones.service';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.css'],
})
export class AdminCountryComponent {
  constructor(private requestService: RequestService, private localizacionesService: LocalizacionesService) { }
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
    alert(this.countryName);
    if (this.countryName !== null || this.countryName !== undefined || this.countryName !== '') {
      this.requestService.post(`${this.localizacionesService.createCountry}`,
        {
          "Name": this.countryName
        })
        .subscribe({
          next(response: any) {
            if (response !== null) {
              alert(`You have successfully added the country.`);
            }
          },
          error(err: Error) {
            alert(err.message)
          }
        });
    } else {
      alert("Please enter a valid name");
    }
  }

  getAllCountries() {
    alert(this.countryId);
    this.requestService
      .get(
        `${this.localizacionesService.getAllCountries}`)
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
    this.requestService
      .get(`${this.localizacionesService.getCountryById}`,
        new HttpParams().append('id', id))
      .subscribe({
        next: (fetchedCountry: any) => {
          this.countries = [{
            id: fetchedCountry.id,
            name: fetchedCountry.name,
          }];
        },
      });
  }  
  updateCountry() {
    /* getting old info*/
    this.requestService
      .get(`${this.localizacionesService.updateCountry}`,
        new HttpParams().append('id', this.countryId))
      .subscribe({
        next: (fetchedCountry: any) => {
          /*alert(JSON.stringify(fetchedCountry));*/
          this.oldCountry = {
            id: fetchedCountry.id,
            name: fetchedCountry.name,
          };
        },
      });

    /*update database*/
    this.requestService
      .put(`${this.localizacionesService.updateCountry}`
        , {
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
    this.getCountryById(this.countryId)
  }
  deleteCountry(id: number) {
    alert(this.countryId);
    this.requestService
      .delete(`${this.localizacionesService.deleteCountry}`,
        new HttpParams().append('id', `${id}`))
      .subscribe({ });
  }

}

