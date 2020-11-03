export default class StreamInfo {
    constructor(id, date, sender, receiver, status, type, time, extras) {
        this.id = id;
        this.date = date;
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
        this.type = type;
        this.time = time;
        this.extras = extras;
    }
}