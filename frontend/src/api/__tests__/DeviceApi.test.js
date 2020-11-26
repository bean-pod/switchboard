import axios from "axios";
import * as SampleData from "../SampleData";
import * as DeviceApi from "../DeviceApi";

jest.mock("axios")

describe("DeviceApi", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    describe("getSenders", () => {
        it("Should call axios and return the senders", done => {
            SampleData.getSenders((senders) => {
                axios.get.mockResolvedValue(senders);
    
                DeviceApi.getSenders((result) => {
                    try {
                        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/encoder");
                        expect(false).toEqual(true);
                        expect(result).toEqual(senders);
                        done();
                    } catch(error) {
                        done(error);
                    }
                })
            })
        })
    })
})