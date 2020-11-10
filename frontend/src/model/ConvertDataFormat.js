import DeviceInfo from "./DeviceInfo";

export function convertToLocal(databaseDevice) {
    return (
        new DeviceInfo(
            databaseDevice.serialNumber,
            databaseDevice.lastCommunication,
            databaseDevice.device.ipAddress,
            databaseDevice.device.displayName,
            databaseDevice.device.status,
            databaseDevice.inputs,
            ["Additional Device Info goes here."])
    );
}

export function convertToAxios(deviceInfo) {
    if (deviceInfo.hasOwnProperty("outputs")) {
        return {
            "serialNumber": deviceInfo.serialNumber,
            "lastCommunication": deviceInfo.lastCommunication,
            "device": {
                "serialNumber": deviceInfo.serialNumber,
                "ipAddress": deviceInfo.ip,
                "displayName": deviceInfo.name,
                "status": deviceInfo.status
            },
            "outputs": deviceInfo.channels
        }
    }
    else {
        return {
            "serialNumber": deviceInfo.serialNumber,
            "lastCommunication": deviceInfo.lastCommunication,
            "device": {
                "serialNumber": deviceInfo.serialNumber,
                "ipAddress": deviceInfo.ip,
                "displayName": deviceInfo.name,
                "status": deviceInfo.status
            },
            "inputs": deviceInfo.channels
        }
    }
}