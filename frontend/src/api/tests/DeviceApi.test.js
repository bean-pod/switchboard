import axios from "axios";
import {jest} from "@jest/globals";
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
});
