import axios from "axios";
import { describe, expect, jest } from "@jest/globals";
import * as DeviceApi from "../DeviceApi";
import * as DeviceFixture from "./DeviceFixture";
import * as authenticationUtil from "../AuthenticationUtil";

jest.mock("axios");

const authorizationHeader = {
  headers: {
    Authorization: "Bearer the_token"
  }
};

describe("DeviceApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getSenders", () => {
    it("Should call axios and return the senders", (done) => {
      const sampleSendersResponse = DeviceFixture.getSampleSendersResponse();
      axios.get.mockResolvedValue({ data: sampleSendersResponse });
      authenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);
      jest
        .spyOn(global.Date, "now")
        .mockImplementationOnce(
          () => new Date(`${sampleSendersResponse[0].lastCommunication}Z`)
        );

      DeviceApi.getSenders((result) => {
        try {
          expect(axios.get).toHaveBeenCalledWith(
            "http://localhost:8080/encoder",
            authorizationHeader
          );
          expect(result).toEqual(DeviceFixture.getExpectedSendersResponse());
          done();
        } catch (error) {
          done(error);
        }
      });
    });
  });

  describe("getReceivers", () => {
    it("Should call axios and return the receivers", (done) => {
      const sampleReceiversResponse = DeviceFixture.getSampleReceiversResponse();
      axios.get.mockResolvedValue({ data: sampleReceiversResponse });
      authenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);
      jest
        .spyOn(global.Date, "now")
        .mockImplementationOnce(
          () => new Date(`${sampleReceiversResponse[0].lastCommunication}Z`)
        );

      DeviceApi.getReceivers((result) => {
        try {
          expect(axios.get).toHaveBeenCalledWith(
            "http://localhost:8080/decoder",
            authorizationHeader
          );
          expect(result).toEqual(DeviceFixture.getExpectedReceiversResponse());
          done();
        } catch (error) {
          done(error);
        }
      });
    });
  });

  describe("updateDeviceName", () => {
    it("Should call axios with the device serial number, new name, and authorization headers", async () => {
      axios.put.mockResolvedValue();

      authenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);

      const dummySerial = "someDeviceId";
      const dummyName = "someDeviceName";

      await DeviceApi.updateDeviceName(dummySerial, dummyName);

      expect(axios.put).toHaveBeenCalledWith(
        process.env.REACT_APP_DEVICE,
        { serialNumber: dummySerial, displayName: dummyName },
        authorizationHeader
      );
    });
  });
  describe("uploadConfiguration() function", () => {
    it("Should call axios.put with expected url, data and headers", async () => {
      axios.put.mockResolvedValue();

      authenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);

      const dummySerial = "someDeviceId";
      const dummyConfigFile = new File([], "someFileName");

      const data = new FormData();
      data.append("configuration", dummyConfigFile);

      const headers = authorizationHeader;
      // eslint-disable-next-line
      const dataBoundary = data._boundary;

      headers.headers[
        "Content-Type"
      ] = `multipart/form-data; boundary=${dataBoundary}`;

      const expected = {
        data,
        headers
      };
      await DeviceApi.uploadConfiguration(dummySerial, dummyConfigFile);

      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.REACT_APP_DEVICE}/config/${dummySerial}`,
        expected.data,
        expected.headers
      );
    });
  });
});
