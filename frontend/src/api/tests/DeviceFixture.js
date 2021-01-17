import DeviceInfo from "../../model/DeviceInfo";
import InputChannelInfo from "../../model/InputChannelInfo";
import OutputChannelInfo from "../../model/OutputChannelInfo";

export function getSampleSendersResponse() {
  return [
    {
      serialNumber: "d7TxFn7o",
      lastCommunication: "2020-11-25 20:48:03",
      device: {
        serialNumber: "d7TxFn7o",
        publicIpAddress: "189.167.89.9",
        privateIpAddress: "127.0.0.1",
        displayName: "sample_sender",
        status: "Running"
      },
      output: [
        {
          id: 3,
          channel: {
            id: 2,
            name: "Channel Two",
            port: 2000
          }
        }
      ],
      deviceType: "encoder"
    },
    {
      serialNumber: "asdf1234",
      lastCommunication: "2020-11-25 20:35:03",
      device: {
        serialNumber: "asdf1234",
        publicIpAddress: "189.167.89.14",
        privateIpAddress: "255.255.255.255",
        displayName: "cool_sender",
        status: "Running"
      },
      output: [
        {
          id: 4,
          channel: {
            id: 1,
            name: "English Channel",
            port: 2999
          }
        }
      ],
      deviceType: "encoder"
    }
  ];
}

export function getExpectedSendersResponse() {
  const sampleSendersResponse = getSampleSendersResponse();
  return [
    new DeviceInfo(
      sampleSendersResponse[0].serialNumber,
      sampleSendersResponse[0].lastCommunication,
      sampleSendersResponse[0].device.publicIpAddress,
      sampleSendersResponse[0].device.privateIpAddress,
      sampleSendersResponse[0].device.displayName,
      "Online",
      [
        new OutputChannelInfo(
          sampleSendersResponse[0].output[0].id,
          sampleSendersResponse[0].output[0].channel.name,
          sampleSendersResponse[0].output[0].channel.port,
          null
        )
      ],
      "encoder",
      ["Additional Device details go here"]
    ),
    new DeviceInfo(
      sampleSendersResponse[1].serialNumber,
      sampleSendersResponse[1].lastCommunication,
      sampleSendersResponse[1].device.publicIpAddress,
      sampleSendersResponse[1].device.privateIpAddress,
      sampleSendersResponse[1].device.displayName,
      "Offline",
      [
        new OutputChannelInfo(
          sampleSendersResponse[1].output[0].id,
          sampleSendersResponse[1].output[0].channel.name,
          sampleSendersResponse[1].output[0].channel.port,
          null
        )
      ],
      "encoder",
      ["Additional Device details go here"]
    )
  ];
}

export function getSampleReceiversResponse() {
  return [
    {
      serialNumber: "z7VBn9aK",
      lastCommunication: null,
      device: {
        serialNumber: "z7VBn9aK",
        publicIpAddress: "189.167.89.9",
        privateIpAddress: "127.0.0.1",
        displayName: "sample_receiver",
        status: "Running"
      },
      input: [
        {
          id: 4,
          channel: {
            id: 1,
            name: "Channel One",
            port: 2000
          }
        }
      ],
      deviceType: "decoder"
    }
  ];
}

export function getExpectedReceiversResponse() {
  const sampleReceiversResponse = getSampleReceiversResponse();
  return [
    new DeviceInfo(
      sampleReceiversResponse[0].serialNumber,
      "Never",
      sampleReceiversResponse[0].device.publicIpAddress,
      sampleReceiversResponse[0].device.privateIpAddress,
      sampleReceiversResponse[0].device.displayName,
      "Pending",
      [
        new InputChannelInfo(
          sampleReceiversResponse[0].input[0].id,
          sampleReceiversResponse[0].input[0].channel.name,
          sampleReceiversResponse[0].input[0].channel.port,
          null
        )
      ],
      "decoder",
      ["Additional Device details go here"]
    )
  ];
}
