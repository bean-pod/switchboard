export default class DeviceInfo {
  constructor(
    serial,
    lastCommunication,
    publicIpAddress,
    privateIpAddress,
    displayName,
    status,
    channels,
    deviceType,
    extras
  ) {
    this.serialNumber = serial;
    this.lastCommunication = lastCommunication;
    this.publicIp = publicIpAddress;
    this.privateIp = privateIpAddress;
    this.name = displayName;
    this.status = status;
    this.channels = channels;
    this.deviceType = deviceType;
    this.extras = extras;
  }

  static getConciseProperties() {
    return [
      "name",
      "serialNumber",
      "status",
      "publicIp",
      "privateIp",
      "channels"
    ];
  }
}
