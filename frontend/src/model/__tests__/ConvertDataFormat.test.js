import { describe, it, expect } from "@jest/globals";
import {
  convertDeviceToDataObject,
  convertStatsToDataObject,
  convertToServiceObject
} from "../ConvertDataFormat";
import DeviceInfo from "../DeviceInfo";
import InChannelInfo from "../InputChannelInfo";
import OutChannelInfo from "../OutputChannelInfo";
import StreamStatisticsInfo from "../StreamStatistics/StreamStatisticsInfo";
import StreamStatsSendInfo from "../StreamStatistics/StreamStatsSendInfo";
import StreamStatsReceiveInfo from "../StreamStatistics/StreamStatsReceiveInfo";
import StreamStatsLinkInfo from "../StreamStatistics/StreamStatsLinkInfo";
import StreamStatsWindowInfo from "../StreamStatistics/StreamStatsWindowInfo";

const sampleInputChannels = [
  new InChannelInfo(1, "test input ch 1", 500, null),
  new InChannelInfo(2, "test input ch 2", 456, null),
  new InChannelInfo(3, "test input ch 3", 800, null)
];
const sampleOutputChannels = [
  new OutChannelInfo(1, "test output ch 1", 500, null),
  new OutChannelInfo(2, "test output ch 2", 456, null),
  new OutChannelInfo(3, "test output ch 3", 800, null)
];
const sampleLocalSender = new DeviceInfo(
  "test sender serial",
  "2020-11-25 20:48:03",
  "test sender public ip",
  "test sender private ip",
  "test sender display",
  "offline",
  sampleOutputChannels,
  "sender"
);
const sampleLocalReceiver = new DeviceInfo(
  "test receiver serial",
  "2020-11-25 20:48:03",
  "test receiver public ip",
  "test receiver private ip",
  "test receiver display",
  "offline",
  sampleInputChannels,
  "receiver"
);
const sampleAxiosSender = {
  serialNumber: "test sender serial",
  lastCommunication: "2020-11-25 20:48:03",
  device: {
    serialNumber: "test sender serial",
    publicIpAddress: "test sender public ip",
    privateIpAddress: "test sender private ip",
    displayName: "test sender display",
    status: "offline"
  },
  outputs: [
    { id: 1, name: "test output ch 1", port: 500, encoder: null },
    { id: 2, name: "test output ch 2", port: 456, encoder: null },
    { id: 3, name: "test output ch 3", port: 800, encoder: null }
  ],
  extras: undefined
};
const sampleAxiosReceiver = {
  serialNumber: "test receiver serial",
  lastCommunication: "2020-11-25 20:48:03",
  device: {
    serialNumber: "test receiver serial",
    publicIpAddress: "test receiver public ip",
    privateIpAddress: "test receiver private ip",
    displayName: "test receiver display",
    status: "offline"
  },
  inputs: [
    { id: 1, name: "test input ch 1", port: 500, decoder: null },
    { id: 2, name: "test input ch 2", port: 456, decoder: null },
    { id: 3, name: "test input ch 3", port: 800, decoder: null }
  ],
  extras: undefined
};

const sampleDBStats = {
  id: 11,
  time: 11,
  window: {
    flow: 11,
    congestion: 11,
    flight: 11
  },
  link: {
    rtt: 11,
    bandwidth: 11,
    maxBandwidth: 11
  },
  send: {
    packets: 11,
    packetsLost: 11,
    packetsDropped: 11,
    packetsRetransmitted: 11,
    bytes: 11,
    bytesDropped: 11,
    mbitRate: 11
  },
  recv: {
    packets: 11,
    packetsLost: 11,
    packetsDropped: 11,
    packetsRetransmitted: 11,
    packetsBelated: 11,
    bytes: 11,
    bytesLost: 11,
    bytesDropped: 11,
    mbitRate: 11
  }
};

const sampleLocalStats = new StreamStatisticsInfo(
  11,
  11,
  new StreamStatsWindowInfo({ flow: 11, congestion: 11, flight: 11 }),
  new StreamStatsLinkInfo({ rtt: 11, bandwidth: 11, maxBandwidth: 11 }),
  new StreamStatsSendInfo({
    packets: 11,
    packetsLost: 11,
    packetsDropped: 11,
    packetsRetransmitted: 11,
    bytes: 11,
    bytesDropped: 11,
    mbitRate: 11
  }),
  new StreamStatsReceiveInfo({
    packets: 11,
    packetsLost: 11,
    packetsDropped: 11,
    packetsRetransmitted: 11,
    packetsBelated: 11,
    bytes: 11,
    bytesLost: 11,
    bytesDropped: 11,
    mbitRate: 11
  })
);

describe("convertDeviceToDataObject function", () => {
  it("returns a DeviceInfo object with correct data", () => {
    const axiosSenderToLocal = JSON.stringify(
      convertDeviceToDataObject(sampleAxiosSender)
    );
    const axiosReceiverToLocal = JSON.stringify(
      convertDeviceToDataObject(sampleAxiosReceiver)
    );
    
    expect(axiosSenderToLocal).toStrictEqual(JSON.stringify(sampleLocalSender));
    expect(axiosReceiverToLocal).toStrictEqual(
      JSON.stringify(sampleLocalReceiver)
    );
  });
});

describe("convertToServiceObject function", () => {
  it("returns information in response format with correct data", () => {
    const localSenderToAxios = JSON.stringify(
      convertToServiceObject(sampleLocalSender)
    );
    const localReceiverToAxios = JSON.stringify(
      convertToServiceObject(sampleLocalReceiver)
    );
    
    expect(localSenderToAxios).toStrictEqual(JSON.stringify(sampleAxiosSender));
    expect(localReceiverToAxios).toStrictEqual(
      JSON.stringify(sampleAxiosReceiver)
    );
  });
});

describe("convertStatsToDataObject function", () => {
  it("returns a StreamStatisticsInfo object with correct data", () => {
    const dbStatsToLocal = convertStatsToDataObject(sampleDBStats);
    
    expect(dbStatsToLocal).toStrictEqual(sampleLocalStats);
  });
});
