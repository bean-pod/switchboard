export default class DeviceInfo {
    constructor(serial, lastCommunication, ipAddress, displayName, status, channels, extras) {
        this.serialNumber = serial;
        this.lastCommunication = lastCommunication;
        this.ip= ipAddress;
        this.name= displayName;
        this.status=status;
        this.channels = channels;
        this.extras = extras;
    }

    // function for converting from format to format
    toCoderFormat() {
        return ({
            serialNumber: this.serialNumber,
            device: {
                serialNumber: this.serialNumber,
                ipAddress: this.ipAddress,
                displayName: this.displayName,
                status: this.status
            }
        });
    }

    toDeviceFormat(coder){
        return (
            new DeviceInfo(
                coder.serialNumber,
                null,
                coder.ipAddress,
                coder.displayName,
                coder.status,
                null,
                null)
        );
    }
}