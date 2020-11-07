import axios from 'axios';
import ChannelInfo from "../model/ChannelInfo";
import DeviceInfo from "../model/DeviceInfo";
import * as SampleData from "./SampleData";

export function getSenders(callback) {
    axios.get("http://localhost:8080/encoder")
        .then((senders) => {
            callback(
                senders.data.map((sender) => {
                    return new DeviceInfo("id", sender.device.displayName, sender.serialNumber, 0, "127.0.0.1", "2300", [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Sample sender"]);
                }));
        })
        .catch((error) => {
            SampleData.getSenders(callback);
        });
}

export function getReceivers(callback) {
    axios.get("http://localhost:8080/decoder")
        .then((receivers) => {
            callback(receivers.data.map((receiver) => {
                return new DeviceInfo("id", receiver.device.displayName, receiver.serialNumber, 0, "127.0.0.1", "2400", [new ChannelInfo("channel 1", 42), new ChannelInfo("channel 2", 609)], ["Sample receiver"]);
            }));
        })
        .catch((error) => {
            SampleData.getReceivers(callback)
        });
}