import axios from 'axios';
import DeviceInfo from "../model/DeviceInfo";
import GenerateData from "./SampleData"

export function getSenders(callback) {
    axios("http://localhost:8080/encoder")
        .then((senders) => {
            callback(
                senders.data.map((sender) => {
                    return new DeviceInfo("id", sender.device.displayName, sender.serialNumber, 0, "127.0.0.1", "2300", ["Sample sender"]);
            }));
        })
        .catch((error) => {
            callback(GenerateData().senders);
        });
}

export function getReceivers(callback) {
    axios("http://localhost:8080/decoder")
        .then((receivers) => {
            callback(receivers.data.map((receiver) => {
                return new DeviceInfo("id", receiver.device.displayName, receiver.serialNumber, 0, "127.0.0.1", "2400", ["Sample receiver"]);
            }));
        })
        .catch((error) => {
            callback(GenerateData().receivers);
        });
}