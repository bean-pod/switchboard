export const allStreamsResponse = [1, 2];

export const firstStreamResponse = {
  id: allStreamsResponse[0],
  inputChannel: {
    id: 1,
    channel: {
      id: 1,
      name: "Sample Receiver Channel 1",
      port: 20002
    },
    decoder: {
      serialNumber: "z7VBn9aK",
      device: {
        serialNumber: "z7VBn9aK",
        publicIpAddress: "0:0:0:0:0:0:0:1",
        privateIpAddress: "127.0.0.1",
        displayName: "sample_receiver",
        status: "online"
      },
      input: null
    }
  },
  outputChannel: {
    id: 2,
    channel: {
      id: 4,
      name: "Sample Sender Channel 2",
      port: 20001
    },
    encoder: {
      serialNumber: "d7TxFn7o",
      device: {
        serialNumber: "d7TxFn7o",
        publicIpAddress: "0:0:0:0:0:0:0:1",
        privateIpAddress: "127.0.0.1",
        displayName: "sample_sender",
        status: "online"
      },
      output: null
    }
  },
  isRendezvous: false
};

export const secondStreamResponse = {
  id: allStreamsResponse[1],
  inputChannel: {
    id: 2,
    channel: {
      id: 2,
      name: "Sample Receiver Channel 2",
      port: 20003
    },
    decoder: {
      serialNumber: "z7VBn9aK",
      device: {
        serialNumber: "z7VBn9aK",
        publicIpAddress: "0:0:0:0:0:0:0:1",
        privateIpAddress: "127.0.0.1",
        displayName: "sample_receiver",
        status: "online"
      },
      input: null
    }
  },
  outputChannel: {
    id: 1,
    channel: {
      id: 3,
      name: "Sample Sender Channel 1",
      port: 20000
    },
    encoder: {
      serialNumber: "d7TxFn7o",
      device: {
        serialNumber: "d7TxFn7o",
        publicIpAddress: "0:0:0:0:0:0:0:1",
        privateIpAddress: "127.0.0.1",
        displayName: "sample_sender",
        status: "online"
      },
      output: null
    }
  },
  isRendezvous: false
};
