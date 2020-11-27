import axios from "axios";
import DeviceInfo from "../model/DeviceInfo";
import * as SampleData from "./SampleData";
import OutputChannelInfo from "../model/OutputChannelInfo";
import InputChannelInfo from "../model/InputChannelInfo";

export function getSenders(callback) {
  axios
    .get("http://localhost:8080/encoder")
    .then((senders) => {
      callback(
        senders.data.map((sender) => {
          let channels = []
          if(sender.output) {
            channels = sender.output.map((output) => {
              return new OutputChannelInfo(
                output.id,
                output.channel.name,
                output.channel.port,
                null
              );
            });
          }
          const lastCommunication = sender.lastCommunication == null ? "Never" : sender.lastCommunication;
          return new DeviceInfo(
            sender.serialNumber,
            lastCommunication,
            sender.device.ipAddress,
            sender.device.displayName,
            getStatus(sender.lastCommunication),
            channels,
            ["Additional Device details go here"]
          );
        })
      );
    })
    .catch((error) => {
      console.error(error);
      SampleData.getSenders(callback);
    });
}

export function getReceivers(callback) {
  axios
    .get("http://localhost:8080/decoder")
    .then((receivers) => {
      callback(
        receivers.data.map((receiver) => {
          let channels = [];
          if(receiver.input) {
            channels = receiver.input.map((input) => {
              return new InputChannelInfo(input.id, input.channel.name, input.channel.port, null);
            });
          }
          const lastCommunication = receiver.lastCommunication == null ? "Never" : receiver.lastCommunication;
          return new DeviceInfo(
            receiver.serialNumber,
            lastCommunication,
            receiver.device.ipAddress,
            receiver.device.displayName,
            getStatus(receiver.lastCommunication),
            channels,
            ["Additional Device details go here"]
          );
        })
      );
    })
    .catch((error) => {
      console.error(error);
      SampleData.getReceivers(callback);
    });
}

function getStatus(lastCommunicationString) {
  if(!lastCommunicationString) {
    return "Pending";
  }

  const lastCommunicationDate = new Date(`${lastCommunicationString}Z`);
  const diff = Date.now() - lastCommunicationDate.getTime();
  const tenMinutes = 10 * 60 * 1000;
  if(diff < tenMinutes) {
    return "Online";
  }
  return "Offline";
}