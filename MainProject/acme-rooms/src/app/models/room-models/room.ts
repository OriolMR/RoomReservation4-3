import { numberAttribute } from "@angular/core";

export class Room {
    public id: number;
    public name: string;
    public capacity: number;
    public officeId: number;

    constructor () {
        this.id = -1;
        this.name = '';
        this.capacity = -1;
        this.officeId = -1;
    }
}
