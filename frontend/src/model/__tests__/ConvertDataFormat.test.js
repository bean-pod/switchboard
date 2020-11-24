import { expect, test } from "@jest/globals";
import {
  convertToDataObject,
  convertToServiceObject
} from "../ConvertDataFormat";
import DeviceInfo from "../DeviceInfo";
import {
  sampleInputChannels,
  sampleOutputChannels
} from "../../api/SampleData";

const sampleLocalSender = new DeviceInfo(
  "test sender serial",
  null,
  "test sender ip",
  "test sender display",
  "offline",
  sampleOutputChannels,
  ["Additional Device Info goes here."]
);
const sampleLocalReceiver = new DeviceInfo(
  "test receiver serial",
  null,
  "test receiver ip",
  "test receiver display",
  "offline",
  sampleInputChannels,
  ["Additional Device Info goes here."]
);
const sampleAxiosSender = {
  serialNumber: "test sender serial",
  lastCommunication: null,
  device: {
    serialNumber: "test sender serial",
    ipAddress: "test sender ip",
    displayName: "test sender display",
    status: "offline"
  },
  outputs: sampleOutputChannels
};
const sampleAxiosReceiver = {
  serialNumber: "test receiver serial",
  lastCommunication: null,
  device: {
    serialNumber: "test receiver serial",
    ipAddress: "test receiver ip",
    displayName: "test receiver display",
    status: "offline"
  },
  inputs: sampleInputChannels
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
