import DeviceInfo from "./DeviceInfo";

export function convertDeviceToDataObject(databaseDevice) {
  return new DeviceInfo(
    databaseDevice.serialNumber,
    databaseDevice.lastCommunication,
    databaseDevice.device.publicIpAddress,
    databaseDevice.device.privateIpAddress,
    databaseDevice.device.displayName,
    databaseDevice.device.status,
    databaseDevice.inputs || databaseDevice.outputs,
    databaseDevice.inputs ? "receiver" : "sender"
  );
}

export function convertToServiceObject(deviceInfo) {
  const serviceObject = {
    serialNumber: deviceInfo.serialNumber,
    lastCommunication: deviceInfo.lastCommunication,
    device: {
      serialNumber: deviceInfo.serialNumber,
      publicIpAddress: deviceInfo.publicIp,
      privateIpAddress: deviceInfo.privateIp,
      displayName: deviceInfo.name,
      status: deviceInfo.status
    }
  };
  if (deviceInfo.deviceType === "sender") {
    serviceObject.outputs = deviceInfo.channels;
  } else {
    serviceObject.inputs = deviceInfo.channels;
  }
  return serviceObject;
}
