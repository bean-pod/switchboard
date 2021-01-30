import {expect, test} from "@jest/globals";
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
    null,
    "test sender public ip",
    "test sender private ip",
    "test sender display",
    "offline",
    undefined,
    undefined
);
const sampleLocalReceiver = new DeviceInfo(
    "test receiver serial",
    null,
    "test receiver public ip",
    "test receiver private ip",
    "test receiver display",
    "offline",
    undefined,
    undefined
);
const sampleAxiosSender = {
    serialNumber: "test sender serial",
    lastCommunication: null,
    device: {
        serialNumber: "test sender serial",
        publicIpAddress: "test sender public ip",
        privateIpAddress: "test sender private ip",
        displayName: "test sender display",
        status: "offline"
    },
    outputs: undefined,
    extras: undefined
};
const sampleAxiosReceiver = {
    serialNumber: "test receiver serial",
    lastCommunication: null,
    device: {
        serialNumber: "test receiver serial",
        publicIpAddress: "test receiver public ip",
        privateIpAddress: "test receiver private ip",
        displayName: "test receiver display",
        status: "offline"
    },
    inputs: undefined,
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
