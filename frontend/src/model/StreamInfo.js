export default class StreamInfo {
    // to be used once backend has date, status, type, and time fields
    // constructor(id, date, sender, receiver, status, type, time, extras) {
    //     this.id = id;
    //     this.date = date;
    //     this.sender = sender;
    //     this.receiver = receiver;
    //     this.status = status;
    //     this.type = type;
    //     this.time = time;
    //     this.extras = extras;
    // }

    // temporary with static fields until backend is up to snuff
    constructor(id, sender, receiver, extras) {
        this.id = id;
        this.date = "2020-10-31T08:15:30";
        this.sender = sender;
        this.receiver = receiver;
        this.status = "Online";
        this.type = "Type 1";
        this.time = "00:34:44";
        this.extras = extras;
    }
}
