import DeviceInfo from "../model/DeviceInfo";
import OutChannelInfo from "../model/OutputChannelInfo";
import InChannelInfo from "../model/InputChannelInfo";
import StreamInfo from "../model/StreamInfo";

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
      "123:456",
      "Sender 1",
      "Online",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:20:111:999",
      null,
      "123:456",
      "Sender 2",
      "Error",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:30:111:999",
      null,
      "123:456",
      "Sender 3",
      "Offline",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:40:111:999",
      null,
      "123:456",
      "Sender 4",
      "Pending",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:50:111:999",
      null,
      "123:456",
      "Sender 5",
      "Online",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:60:111:999",
      null,
      "123:456",
      "Sender 6",
      "Error",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:70:111:999",
      null,
      "123:456",
      "Sender 7",
      "Offline",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:80:111:999",
      null,
      "123:456",
      "Sender 8",
      "Pending",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:90:111:999",
      null,
      "123:456",
      "Sender 9",
      "Online",
      sampleOutputChannels,
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
    extras
  );
}

export function getReceivers(callback) {
  const sampleReceivers = [
    new DeviceInfo(
      "1:01:111:999",
      null,
      "123:456",
      "Receiver 1",
      "Online",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:02:111:999",
      null,
      "123:456",
      "Receiver 2",
      "Error",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:03:111:999",
      null,
      "123:456",
      "Receiver 3",
      "Offline",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:04:111:999",
      null,
      "123:456",
      "Receiver 4",
      "Pending",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:05:111:999",
      null,
      "123:456",
      "Receiver 5",
      "Online",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:06:111:999",
      null,
      "123:456",
      "Receiver 6",
      "Error",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:07:111:999",
      null,
      "123:456",
      "Receiver 7",
      "Offline",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:08:111:999",
      null,
      "123:456",
      "Receiver 8",
      "Pending",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:09:111:999",
      null,
      "123:456",
      "Receiver 9",
      "Online",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:11:111:999",
      null,
      "123:456",
      "Receiver 11",
      "Online",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:21:111:999",
      null,
      "123:456",
      "Receiver 12",
      "Error",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:31:111:999",
      null,
      "123:456",
      "Receiver 13",
      "Offline",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:41:111:999",
      null,
      "123:456",
      "Receiver 14",
      "Pending",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:51:111:999",
      null,
      "123:456",
      "Receiver 15",
      "Online",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:61:111:999",
      null,
      "123:456",
      "Receiver 16",
      "Error",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:71:111:999",
      null,
      "123:456",
      "Receiver 17",
      "Offline",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:81:111:999",
      null,
      "123:456",
      "Receiver 18",
      "Pending",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:91:111:999",
      null,
      "123:456",
      "Receiver 19",
      "Online",
      sampleInputChannels,
      extras
    )
  ];

  callback(sampleReceivers);
}

export function getAllStreams(callback) {
  const sampleSenders = [
    new DeviceInfo(
      "1:10:111:999",
      null,
      "123:456",
      "Sender 1",
      "Online",
      sampleOutputChannels,
      extras
    ),
    new DeviceInfo(
      "1:20:111:999",
      null,
      "123:456",
      "Sender 2",
      "Error",
      sampleOutputChannels,
      extras
    )
  ];
  const sampleReceivers = [
    new DeviceInfo(
      "1:01:111:999",
      null,
      "123:456",
      "Receiver 1",
      "Online",
      sampleInputChannels,
      extras
    ),
    new DeviceInfo(
      "1:02:111:999",
      null,
      "123:456",
      "Receiver 2",
      "Error",
      sampleInputChannels,
      extras
    )
  ];

  const sampleStreams = [
    new StreamInfo(1, sampleSenders[0], sampleReceivers[0], [
      "Additional Stream Details go here"
    ]),
    new StreamInfo(2, sampleSenders[1], sampleReceivers[1], [
      "Additional Stream Details go here"
    ]),
    new StreamInfo(3, sampleSenders[1], sampleReceivers[0], [
      "Additional Stream Details go here"
    ])
  ];

  callback(sampleStreams);
}
