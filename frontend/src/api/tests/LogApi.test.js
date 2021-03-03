import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import * as LogApi from "../LogApi";
import * as SampleData from "../SampleData";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");

const mockLogs = [
  {
    id: 1,
    dateTime: "2020-10-31T15:53:23",
    level: "info",
    message: "Log test 1"
  },
  {
    id: 2,
    dateTime: "2020-11-13T12:36:30",
    level: "info",
    message: "Log test 2"
  }
];

const expectedLogsResponse = [
  {
    id: 1,
    dateTime: "Sat Oct 31 2020 15:53:23",
    level: "info",
    message: "Log test 1"
  },
  {
    id: 2,
    dateTime: "Fri Nov 13 2020 12:36:30",
    level: "info",
    message: "Log test 2"
  }
];

let sampleLogs;
SampleData.getAllLogs((result) => {
  sampleLogs = result;
});

describe("Log Api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getDeviceLogs", () => {
    it("should call axios.get and return device logs from a device/serial number", async () => {
      axios.get.mockResolvedValue({ data: mockLogs });

      const result = await LogApi.getDeviceLogs(123);
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/log/123");
      expect(result).toEqual(expectedLogsResponse);
    });
    it("If there is no response from the backend, it should return sample data", async () => {
      axios.get.mockRejectedValue();

      const result = await LogApi.getDeviceLogs();
      expect(result).toEqual(sampleLogs);
    });
  });

  describe("getAllLogs", () => {
    it("should call axios.get and return an array of streams", async () => {
      axios.get.mockResolvedValue({ data: mockLogs });

      const result = await LogApi.getAllLogs();
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/log");
      expect(result).toEqual(expectedLogsResponse);
    });
    it("If there is no response from the backend, it should return sample data", async () => {
      axios.get.mockRejectedValue();

      const result = await LogApi.getAllLogs();
      expect(result).toEqual(sampleLogs);
    });
  });
});
