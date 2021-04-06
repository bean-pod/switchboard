import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import * as LogApi from "../LogApi";
import * as SampleData from "../SampleData";
import * as AuthenticationUtil from "../AuthenticationUtil";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");
jest.mock("../AuthenticationUtil");
jest.spyOn(AuthenticationUtil, "getAuthorizationHeader");

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

let sampleLogs;
SampleData.getAllLogs((result) => {
  sampleLogs = result;
});

const authorizationHeader = {
  headers: {
    Authorization: "Bearer the_token"
  }
};

describe("Log Api", () => {
  beforeEach(() => {
    AuthenticationUtil.getAuthorizationHeader.mockReturnValue(
      authorizationHeader
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getDeviceLogs", () => {
    it("should call axios.get and return device logs from a device/serial number", async () => {
      axios.get.mockResolvedValue({ data: mockLogs });
      AuthenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);
      const result = await LogApi.getDeviceLogs(123);
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/log/123",
        authorizationHeader
      );
      expect(result).toEqual(expectedLogsResponse);
    });
    it("If there is no response from the backend, it should return sample data", async () => {
      axios.get.mockRejectedValue();

      const result = await LogApi.getDeviceLogs();
      expect(result).toEqual(sampleLogs);
    });
  });

  describe("getStreamLogs", () => {
    it("should call axios.get and return stream logs from a stream id", async () => {
      axios.get.mockResolvedValue({ data: mockLogs });
      AuthenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);
      const result = await LogApi.getStreamLogs(123);
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/log/stream/123",
        authorizationHeader
      );
      expect(result).toEqual(expectedLogsResponse);
    });
    it("If there is no response from the backend, it should return sample data", async () => {
      axios.get.mockRejectedValue();

      const result = await LogApi.getStreamLogs();

      expect(result).toEqual(sampleLogs);
    });
  });

  describe("getAllLogs", () => {
    it("should call axios.get and return an array of streams", async () => {
      axios.get.mockResolvedValue({ data: mockLogs });
      AuthenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);
      const result = await LogApi.getAllLogs();
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/log",
        authorizationHeader
      );
      expect(result).toEqual(expectedLogsResponse);
    });
    it("If there is no response from the backend, it should return sample data", async () => {
      axios.get.mockRejectedValue();

      const result = await LogApi.getAllLogs();
      expect(result).toEqual(sampleLogs);
    });
  });
});
