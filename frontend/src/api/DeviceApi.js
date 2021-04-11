import axios from "axios";
import DeviceInfo from "../model/DeviceInfo";
import OutputChannelInfo from "../model/OutputChannelInfo";
import InputChannelInfo from "../model/InputChannelInfo";
import { getAuthorizationHeader } from "./AuthenticationUtil";

function getStatus(lastCommunicationString) {
  if (!lastCommunicationString) {
    return "Pending";
  }

  const lastCommunicationDate = new Date(`${lastCommunicationString}Z`);
  const diff = Date.now() - lastCommunicationDate.getTime();
  const tenMinutes = 10 * 60 * 1000;
  if (diff < tenMinutes) {
    return "Online";
  }
  return "Offline";
}

export async function getSenders() {
  return axios
    .get(process.env.REACT_APP_ENCODER, getAuthorizationHeader())
    .then((senders) => {
      return Promise.resolve(
        senders.data.map((sender) => {
          const status =
            sender.device.status.charAt(0).toUpperCase() +
            sender.device.status.slice(1);
          let channels = [];
          if (sender.output) {
            channels = sender.output.map((output) => {
              return new OutputChannelInfo(
                output.id,
                output.channel.name,
                output.channel.port,
                null
              );
            });
          }
          const lastCommunication =
            sender.lastCommunication == null
              ? "Never"
              : sender.lastCommunication;
          return new DeviceInfo(
            sender.serialNumber,
            lastCommunication,
            sender.device.publicIpAddress,
            sender.device.privateIpAddress,
            sender.device.displayName,
            status,
            channels,
            "encoder",
            sender.device.configurationInstance
          );
        })
      );
    });
}

export async function getReceivers() {
  return axios
    .get(process.env.REACT_APP_DECODER, getAuthorizationHeader())
    .then((receivers) => {
      return Promise.resolve(
        receivers.data.map((receiver) => {
          const status =
            receiver.device.status.charAt(0).toUpperCase() +
            receiver.device.status.slice(1);
          let channels = [];
          if (receiver.input) {
            channels = receiver.input.map((input) => {
              return new InputChannelInfo(
                input.id,
                input.channel.name,
                input.channel.port,
                null
              );
            });
          }
          const lastCommunication =
            receiver.lastCommunication == null
              ? "Never"
              : receiver.lastCommunication;
          return new DeviceInfo(
            receiver.serialNumber,
            lastCommunication,
            receiver.device.publicIpAddress,
            receiver.device.privateIpAddress,
            receiver.device.displayName,
            status,
            channels,
            "decoder",
            receiver.device.configurationInstance
          );
        })
      );
    });
}

export function deleteDevice(deviceId) {
  return axios.delete(
    `${process.env.REACT_APP_DEVICE}/${deviceId}`,
    getAuthorizationHeader()
  );
}

export async function updateDeviceName(deviceId, updatedName) {
  return axios.put(
    process.env.REACT_APP_DEVICE,
    {
      serialNumber: deviceId,
      displayName: updatedName
    },
    getAuthorizationHeader()
  );
}

// https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
export async function uploadConfiguration(deviceId, configFile) {
  const data = new FormData();
  data.append("configuration", configFile);
  const headers = getAuthorizationHeader();
  // eslint-disable-next-line
  headers.headers["Content-Type"] = `multipart/form-data; boundary=${data["_boundary"]}` ;
  return axios.put(
    `${process.env.REACT_APP_DEVICE}/config/${deviceId}`,
    data,
    headers
  );
}
