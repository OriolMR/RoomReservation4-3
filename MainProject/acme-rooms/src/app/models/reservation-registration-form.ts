export class ReservationRegistrationForm {
    public date: string;
    public startTime: string;
    public endTime: string;
    public roomId: number;
    public userId: string;

    constructor() {
        this.date = "0000-00-00";
        this.startTime = "00:00";
        this.endTime = "00:00";
        this.roomId = -1;
        this.userId = "";
    }
}
