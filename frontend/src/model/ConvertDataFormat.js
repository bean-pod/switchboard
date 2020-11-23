import DeviceInfo from "./DeviceInfo";

export function convertToDataObject(databaseDevice) {
  return new DeviceInfo(
    databaseDevice.serialNumber,
    databaseDevice.lastCommunication,
    databaseDevice.device.ipAddress,
    databaseDevice.device.displayName,
    databaseDevice.device.status,
    databaseDevice.inputs,
    ["Additional Device Info goes here."]
  );
}

export function convertToServiceObject(deviceInfo) {
  if (Object.prototype.hasOwnProperty.call(deviceInfo, "outputs")) {
    return {
      serialNumber: deviceInfo.serialNumber,
      lastCommunication: deviceInfo.lastCommunication,
      device: {
        serialNumber: deviceInfo.serialNumber,
        ipAddress: deviceInfo.ip,
        displayName: deviceInfo.name,
        status: deviceInfo.status
      },
      outputs: deviceInfo.channels
    };
  }
  return {
    serialNumber: deviceInfo.serialNumber,
    lastCommunication: deviceInfo.lastCommunication,
    device: {
      serialNumber: deviceInfo.serialNumber,
      ipAddress: deviceInfo.ip,
      displayName: deviceInfo.name,
      status: deviceInfo.status
    },
    inputs: deviceInfo.channels
  };
}
