import { expect, test } from "@jest/globals";
import {
  convertToDataObject,
  convertToServiceObject
} from "../ConvertDataFormat";
import DeviceInfo from "../DeviceInfo";
import InChannelInfo from "../InputChannelInfo";
import OutChannelInfo from "../OutputChannelInfo";

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

test("convertToDataObject returns DeviceInfo object with correct data", () => {
  const axiosSenderToLocal = JSON.stringify(
    convertToDataObject(sampleAxiosSender)
  );
  const axiosReceiverToLocal = JSON.stringify(
    convertToDataObject(sampleAxiosReceiver)
  );

  expect(axiosSenderToLocal).toStrictEqual(JSON.stringify(sampleLocalSender));
  expect(axiosReceiverToLocal).toStrictEqual(
    JSON.stringify(sampleLocalReceiver)
  );
});

test("convertToServiceObject returns information in response format with correct data", () => {
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
