import axios from "axios";
import * as SampleData from "../SampleData";
import * as DeviceApi from "../DeviceApi";
import * as DeviceFixture from "./DeviceFixture";

jest.mock("axios");

describe("DeviceApi", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getSenders", () => {
        it("Should call axios and return the senders", (done) => {
            const sampleSendersResponse = DeviceFixture.getSampleSendersResponse();
            axios.get.mockResolvedValue({data: sampleSendersResponse});
            jest
                .spyOn(global.Date, "now")
                .mockImplementationOnce(
                    () => new Date(`${sampleSendersResponse[0].lastCommunication}Z`)
                );

            DeviceApi.getSenders((result) => {
                try {
                    expect(axios.get).toHaveBeenCalledWith(
                        "http://localhost:8080/encoder"
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
            axios.get.mockResolvedValue({data: sampleReceiversResponse});
            jest
                .spyOn(global.Date, "now")
                .mockImplementationOnce(
                    () => new Date(`${sampleReceiversResponse[0].lastCommunication}Z`)
                );

            DeviceApi.getReceivers((result) => {
                try {
                    expect(axios.get).toHaveBeenCalledWith(
                        "http://localhost:8080/decoder"
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
