import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import * as LogApi from "../LogApi";
import * as SampleData from "../SampleData";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");

const mockSingleLog = {
  id: 1,
  dateTime: "2020-10-31T15:53:23",
  level: "info",
  message: "Log test 1"
};
const mockLogs = [
  mockSingleLog,
  {
    id: 2,
    dateTime: "2020-11-13T12:36:30",
    level: "info",
    message: "Log test 2"
  }
];

const mockSingleDeviceLog = {
  id: 1,
  dateTime: "2020-10-31T15:53:23",
  level: "info",
  message: "Log test 1"
};
const mockDeviceLogs = [
  mockSingleDeviceLog,
  {
    id: 2,
    dateTime: "2020-11-13T12:36:30",
    level: "info",
    message: "Log test 2"
  }
];

describe("Log Api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getDeviceLogs", () => {
    it("should call axios.get and return device logs from a device/serial number", () => {
      axios.get.mockResolvedValue({ data: mockDeviceLogs });

      LogApi.getDeviceLogs(123)
        .then((result) => {
          expect(axios.get).toHaveBeenCalledWith(
            "http://localhost:8080/logs/123"
          );
          expect(result).toEqual(mockDeviceLogs);
        })
        .catch(() => expect(SampleData.getAllLogs).toHaveBeenCalled());
    });
  });

  describe("getAllLogs", () => {
    it("should call axios.get and return an array of streams", () => {
      axios.get.mockResolvedValue({ data: mockLogs });

      LogApi.getAllLogs()
        .then((result) => {
          expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/logs");
          expect(result).toEqual(mockLogs);
        })
        .catch(() => expect(SampleData.getAllLogs).toHaveBeenCalled());
    });
  });
});
