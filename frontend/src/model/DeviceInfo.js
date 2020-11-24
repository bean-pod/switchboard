export default class DeviceInfo {
  constructor(
    serial,
    lastCommunication,
    ipAddress,
    displayName,
    status,
    channels,
    extras
  ) {
    this.serialNumber = serial;
    this.lastCommunication = lastCommunication;
    this.ip = ipAddress;
    this.name = displayName;
    this.status = status;
    this.channels = channels;
    this.extras = extras;
  }

  static getProperties() {
    return [
      "serialNumber",
      "lastCommunication",
      "ip",
      "name",
      "status",
      "channels",
      "extras"
    ];
  }
}
