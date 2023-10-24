export class ReservationExtendedDTO {
    public id: number;
    public date: string;
    public startTime: string;
    public endTime: string;
    public roomName: string;
    public roomId: number;
    public officeName: string;
    public cityName: string;
    public countryName: string;
    public userId: string;


    constructor() {
        this.id = -1;
        this.date = "0000-00-00";
        this.startTime = "00:00";
        this.endTime = "00:00";
        this.roomName = "";
        this.roomId = -1;
        this.officeName = "";
        this.cityName = "";
        this.countryName = "";
        this.userId = "";
    }
}
