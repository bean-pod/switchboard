import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import * as StreamApi from "../StreamApi";
import StreamInfo from "../../model/StreamInfo";
import { convertToDataObject } from "../../model/ConvertDataFormat";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");

const axiosAllStreamsResponse = [1, 2];
const axiosGetFirstStreamResponse = {
  id: 1,
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

const axiosGetSecondStreamResponse = {
  id: 2,
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

const expectedFirstStreamRespone = new StreamInfo(
  1,
  convertToDataObject(axiosGetFirstStreamResponse.outputChannel.encoder),
  convertToDataObject(axiosGetFirstStreamResponse.inputChannel.decoder),
  ["Additional stream info goes here."]
);
const expectedSecondStreamRespone = new StreamInfo(
  2,
  convertToDataObject(axiosGetSecondStreamResponse.outputChannel.encoder),
  convertToDataObject(axiosGetSecondStreamResponse.inputChannel.decoder),
  ["Additional stream info goes here."]
);

const expectedAllStreamsResponse = [
  expectedFirstStreamRespone,
  expectedSecondStreamRespone
];

describe("Stream Api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getStream", () => {
    it("should call axios.get and return a single stream's information", async () => {
      axios.get.mockResolvedValue({ data: axiosGetFirstStreamResponse });
      const response = await StreamApi.getStream(123);

      // check that callback was invoked with correct value
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/stream/123`
      );

      expect(response).toEqual(expectedFirstStreamRespone);
    });
  });

  describe("getAllStreams", () => {
    it("should call axios.get and return an array of streams", async () => {
      axios.get
        .mockResolvedValueOnce({ data: axiosAllStreamsResponse })
        .mockResolvedValueOnce({ data: axiosGetFirstStreamResponse })
        .mockResolvedValueOnce({ data: axiosGetSecondStreamResponse });

      const response = await StreamApi.getAllStreams();
      expect(response).toEqual(expectedAllStreamsResponse);

      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/stream");
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/stream/1");
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/stream/2");
    });
  });

  describe("deleteStream", () => {
    it("should call axios.get and resolve the promise once the delete is complete", async () => {
      axios.delete.mockResolvedValue();

      await StreamApi.deleteStream(1);

      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:8080/stream/1"
      );
    });
  });
});
