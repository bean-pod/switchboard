import axios from 'axios';
import ChannelInfo from "../model/ChannelInfo";
import OutChannelInfo from "../model/OutputChannelInfo";
import InChannelInfo from "../model/InputChannelInfo";
import DeviceInfo from "../model/DeviceInfo";
import * as SampleData from "./SampleData";

export function getSenders(callback) {
    axios.get("http://localhost:8080/encoder")
        .then((senders) => {
            callback(
                senders.data.map((sender) => {
                    return new DeviceInfo(sender.serialNumber, "Last Communication", "127.0.0.1", sender.device.displayName, 0, 0, [new OutChannelInfo(15, "channel 1", 420, null), new OutChannelInfo(65, "Channel 2", 490, null)], ["Sample sender"]);
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
                return new DeviceInfo(receiver.serialNumber, "Last Communication", "127.0.0.1", receiver.device.displayName, 0, 0, [new InChannelInfo(15, "channel 1", 420, null), new InChannelInfo(65, "Channel 2", 490, null)], ["Sample Reciever"]);
            }));
        })
        .catch((error) => {
            SampleData.getReceivers(callback)
        });
}