export default class DeviceInfo {
  constructor(
    serial,
    lastCommunication,
    publicIpAddress,
    privateIpAddress,
    displayName,
    status,
    channels,
    extras
  ) {
    this.serialNumber = serial;
    this.lastCommunication = lastCommunication;
    this.publicIp = publicIpAddress;
    this.privateIp = privateIpAddress;
    this.name = displayName;
    this.status = status;
    this.channels = channels;
    this.extras = extras;
  }

  static getConciseProperties() {
    return ["name", "serialNumber", "status", "publicIp","privateIp", "channels"];
  }
}
