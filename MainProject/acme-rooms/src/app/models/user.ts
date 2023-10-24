import { numberAttribute } from "@angular/core";

export class User {
  public id: number;
  public name: string;
  public password: string;
  public email: string;
  public phone: number;

  constructor() {
    this.id = -1;
    this.name = '';
    this.password = '';
    this.email = '';
    this.phone = -1;
  }
}
