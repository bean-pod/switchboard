import DeviceInfo from "../model/DeviceInfo";
import OutChannelInfo from "../model/OutputChannelInfo";
import InChannelInfo from "../model/InputChannelInfo";
import StreamInfo from "../model/StreamInfo";
import LogInfo from "../model/LogInfo";
import { convertStatsToDataObject } from "../model/ConvertDataFormat";

const extras = ["Additional Device details go here"];
const sampleInputChannels = [
  new InChannelInfo(1, "Input ch 1", 500, null),
  new InChannelInfo(2, "Input ch 2", 456, null),
  new InChannelInfo(3, "Input ch 3", 800, null)
];
const sampleOutputChannels = [
  new OutChannelInfo(1, "Output ch 1", 500, null),
  new OutChannelInfo(2, "Output ch 2", 456, null),
  new OutChannelInfo(3, "Output ch 3", 800, null)
];

export function getSenders(callback) {
  const sampleSenders = [
    new DeviceInfo(
      "1:10:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 1",
      "Online",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:20:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 2",
      "Error",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:30:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 3",
      "Offline",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:40:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 4",
      "Pending",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:50:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 5",
      "Online",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:60:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 6",
      "Error",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:70:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 7",
      "Offline",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:80:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 8",
      "Pending",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:90:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 9",
      "Online",
      sampleOutputChannels,
      "encoder",
      extras
    )
  ];

  callback(sampleSenders);
}

export function getSampleSender() {
  return new DeviceInfo(
    "1:10:111:999",
    null,
    "123:456",
    "Sender 1",
    "Online",
    sampleOutputChannels,
    "encoder",
    extras
  );
}

export function getReceivers(callback) {
  const sampleReceivers = [
    new DeviceInfo(
      "1:01:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 1",
      "Online",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:02:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 2",
      "Error",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:03:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 3",
      "Offline",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:04:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 4",
      "Pending",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:05:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 5",
      "Online",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:06:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 6",
      "Error",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:07:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 7",
      "Offline",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:08:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 8",
      "Pending",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:09:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 9",
      "Online",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:11:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 11",
      "Online",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:21:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 12",
      "Error",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:31:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 13",
      "Offline",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:41:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 14",
      "Pending",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:51:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 15",
      "Online",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:61:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 16",
      "Error",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:71:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 17",
      "Offline",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:81:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 18",
      "Pending",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:91:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 19",
      "Online",
      sampleInputChannels,
      "decoder",
      extras
    )
  ];

  callback(sampleReceivers);
}

export function getAllStreams() {
  const sampleSenders = [
    new DeviceInfo(
      "1:10:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 1",
      "Online",
      sampleOutputChannels,
      "encoder",
      extras
    ),
    new DeviceInfo(
      "1:20:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Sender 2",
      "Error",
      sampleOutputChannels,
      "encoder",
      extras
    )
  ];
  const sampleReceivers = [
    new DeviceInfo(
      "1:01:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 1",
      "Online",
      sampleInputChannels,
      "decoder",
      extras
    ),
    new DeviceInfo(
      "1:02:111:999",
      null,
      "175.214.12.96",
      "123:456",
      "Receiver 2",
      "Error",
      sampleInputChannels,
      "decoder",
      extras
    )
  ];

  return [
    new StreamInfo(1, sampleSenders[0], sampleReceivers[0], 1, 2),
    new StreamInfo(2, sampleSenders[1], sampleReceivers[1], 3, 4),
    new StreamInfo(3, sampleSenders[1], sampleReceivers[0], 5, 6)
  ];
}

export function getSampleStream() {
  const sampleSender = new DeviceInfo(
    "1:10:111:999",
    null,
    "123:456",
    "Sender 1",
    "Online",
    sampleOutputChannels,
    "encoder",
    extras
  );

  const sampleReceiver = new DeviceInfo(
    "1:22:333:989",
    null,
    "145:396",
    "Receiver 1",
    "Online",
    sampleOutputChannels,
    "decoder",
    extras
  );

  return new StreamInfo(
    1,
    sampleSender,
    sampleReceiver,
    sampleSender.channels[0].port,
    sampleReceiver.channels[1].port
  );
}

export function getAllLogs(callback) {
  const dates = [
    new Date("2020-10-31T15:53:23"),
    new Date("2020-11-13T12:36:30"),
    new Date("2020-11-13T08:24:30")
  ];

  const sampleLogs = [
    new LogInfo(1, dates[0], "Info", "Log 1 info"),
    new LogInfo(2, dates[1], "Info", "Log 2 info"),
    new LogInfo(3, dates[2], "Info", "Log 3 info")
  ];

  callback(sampleLogs);
}

export function getSampleStreamStats() {
  const sampleDbStreamStats = {
    id: 1,
    time: 2,
    window: {
      flow: 31,
      congestion: 32,
      flight: 33
    },
    link: {
      rtt: 41,
      bandwidth: 42,
      maxBandwidth: 43
    },
    send: {
      packets: 51,
      packetsLost: 52,
      packetsDropped: 53,
      packetsRetransmitted: 54,
      bytes: 55,
      bytesDropped: 56,
      mbitRate: 57
    },
    recv: {
      packets: 61,
      packetsLost: 62,
      packetsDropped: 63,
      packetsRetransmitted: 64,
      packetsBelated: 65,
      bytes: 66,
      bytesLost: 67,
      bytesDropped: 68,
      mbitRate: 69
    }
  };

  return convertStatsToDataObject(sampleDbStreamStats);
}
