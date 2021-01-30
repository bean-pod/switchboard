import DeviceInfo from "./DeviceInfo";

export function convertToDataObject(databaseDevice) {
    return new DeviceInfo(
        databaseDevice.serialNumber,
        databaseDevice.lastCommunication,
        databaseDevice.device.publicIpAddress,
        databaseDevice.device.privateIpAddress,
        databaseDevice.device.displayName,
        databaseDevice.device.status,
        databaseDevice.inputs
    );
}

export function convertToServiceObject(deviceInfo) {
    if (Object.prototype.hasOwnProperty.call(deviceInfo, "outputs")) {
        return {
            serialNumber: deviceInfo.serialNumber,
            lastCommunication: deviceInfo.lastCommunication,
            device: {
                serialNumber: deviceInfo.serialNumber,
                publicIpAddress: deviceInfo.publicIp,
                privateIpAddress: deviceInfo.privateIp,
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
            publicIpAddress: deviceInfo.publicIp,
            privateIpAddress: deviceInfo.privateIp,
            displayName: deviceInfo.name,
            status: deviceInfo.status
        },
        inputs: deviceInfo.channels
    };
}
