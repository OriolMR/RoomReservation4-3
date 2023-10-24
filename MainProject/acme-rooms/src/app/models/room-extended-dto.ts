export class RoomExtendedDTO {
    public id: number;
    public name: string;
    public capacity: number;
    public officeName: string;
    public cityName: string;
    public countryName: string;


    constructor() {
        this.id = -1;
        this.name = "";
        this.capacity = -1;
        this.officeName = "";
        this.cityName = "";
        this.countryName = "";
    }
}
