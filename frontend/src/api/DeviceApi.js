import axios from 'axios';
import DeviceInfo from "../model/DeviceInfo";
import * as SampleData from "./SampleData";
import OutputChannelInfo from '../model/OutputChannelInfo';
import InputChannelInfo from '../model/InputChannelInfo';

export function getSenders(callback) {
    axios.get("http://localhost:8080/encoder")
        .then((senders) => {
            callback(
                senders.data.map((sender) => {
                    var channels = sender.outputs.map((output) => {
                        return new OutputChannelInfo(output.id, output.name, output.port, null);
                    })
                    return new DeviceInfo(sender.serialNumber, "Last Communication", sender.device.ipAddress, sender.device.displayName, "Online", channels, ["Sample sender"]);
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
                var channels = receiver.inputs.map((input) => {
                    return new InputChannelInfo(input.id, input.name, input.port, null);
                })
                return new DeviceInfo(receiver.serialNumber, "Last Communication", receiver.device.ipAddress, receiver.device.displayName, "Online", channels, ["Sample Reciever"]);
            }));
        })
        .catch((error) => {
            SampleData.getReceivers(callback);
        });
}