import axios from "axios";
import * as SampleData from "../SampleData";
import * as DeviceApi from "../DeviceApi";
import * as DeviceFixture from "./DeviceFixture";

jest.mock("axios")

describe("DeviceApi", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    describe("getSenders", () => {
        it("Should call axios and return the senders", done => {
            axios.get.mockResolvedValue({data: DeviceFixture.getSampleSendersResponse()});

            DeviceApi.getSenders((result) => {
                try {
                    expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/encoder");
                    expect(result).toEqual(DeviceFixture.getExpectedSendersResponse());
                    done();
                } catch(error) {
                    done(error);
                }
            })
        })
    })
})