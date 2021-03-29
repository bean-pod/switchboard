import DeviceInfo from "./DeviceInfo";
import StreamStatisticsInfo from "./StreamStatistics/StreamStatisticsInfo";
import StreamStatsSendInfo from "./StreamStatistics/StreamStatsSendInfo";
import StreamStatsReceiveInfo from "./StreamStatistics/StreamStatsReceiveInfo";
import StreamStatsLinkInfo from "./StreamStatistics/StreamStatsLinkInfo";
import StreamStatsWindowInfo from "./StreamStatistics/StreamStatsWindowInfo";

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

export function convertStatsToDataObject(databaseStats) {
  return new StreamStatisticsInfo(
    databaseStats.id,
    databaseStats.time,
    new StreamStatsWindowInfo(
      databaseStats.window.flow,
      databaseStats.window.congestion,
      databaseStats.window.flight
    ),
    new StreamStatsLinkInfo(
      databaseStats.link.rtt,
      databaseStats.link.bandwidth,
      databaseStats.link.maxBandwidth
    ),
    new StreamStatsSendInfo(
      databaseStats.send.packets,
      databaseStats.send.packetsLost,
      databaseStats.send.packetsDropped,
      databaseStats.send.packetsRetransmitted,
      databaseStats.send.bytes,
      databaseStats.send.bytesDropped,
      databaseStats.send.mbitRate
    ),
    new StreamStatsReceiveInfo(
      databaseStats.recv.packets,
      databaseStats.recv.packetsLost,
      databaseStats.recv.packetsDropped,
      databaseStats.recv.packetsRetransmitted,
      databaseStats.recv.packetsBelated,
      databaseStats.recv.bytes,
      databaseStats.recv.bytesLost,
      databaseStats.recv.bytesDropped,
      databaseStats.recv.mbitRate
    )
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
