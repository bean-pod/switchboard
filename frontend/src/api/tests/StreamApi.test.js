import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import * as authenticationUtil from "../AuthenticationUtil";
// import StreamApi itself
import * as StreamApi from "../StreamApi";
import StreamInfo from "../../model/StreamInfo";
import { convertToDataObject } from "../../model/ConvertDataFormat";
import * as StreamFixture from "./StreamFixture";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");
jest.mock("../AuthenticationUtil");

const {
  firstStreamResponse,
  secondStreamResponse,
  allStreamsResponse
} = StreamFixture;

const expectedFirstStreamRespone = new StreamInfo(
  1,
  convertToDataObject(firstStreamResponse.outputChannel.encoder),
  convertToDataObject(firstStreamResponse.inputChannel.decoder),
  20001,
  20002
);
const expectedSecondStreamResponse = new StreamInfo(
  2,
  convertToDataObject(secondStreamResponse.outputChannel.encoder),
  convertToDataObject(secondStreamResponse.inputChannel.decoder),
  20000,
  20003
);

const expectedAllStreamsResponse = [
  expectedFirstStreamRespone,
  expectedSecondStreamResponse
];

const authorizationHeader = {
  headers: {
    Authorization: "Bearer the_token"
  }
};

describe("Stream Api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getStream", () => {
    it("should call axios.get and return a single stream's information", () => {
      authenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);
      StreamApi.getStream(123);

      // check that callback was invoked with correct value
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/stream/123`,
          authorizationHeader
      );

      expect(response).toEqual(expectedFirstStreamRespone);
    });
  });

  describe("getAllStreams", () => {
    it("should call axios.get and return an array of streams", async () => {
      axios.get
        .mockResolvedValueOnce({ data: allStreamsResponse })
        .mockResolvedValueOnce({ data: firstStreamResponse })
        .mockResolvedValueOnce({ data: secondStreamResponse });

      authenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);

      const response = await StreamApi.getAllStreams();
      expect(response).toEqual(expectedAllStreamsResponse);

      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/stream", authorizationHeader);
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/stream/1", authorizationHeader);
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/stream/2", authorizationHeader);
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
