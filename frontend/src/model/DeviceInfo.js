export default class DeviceInfo {
    constructor(id, name, serial, status, ip, port, extras) {

        this.id = id;
        this.name = name;
        this.serial = serial;
        this.status = status;
        this.ip = ip;
        this.port = port;
        this.extras = extras;
    }
}