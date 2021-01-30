import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    jest,
    it
} from "@jest/globals";
import DeviceInfo from "../../model/DeviceInfo";
import DeviceDetailsConciseTable from "../DeviceDetailsConciseTable";
import DeviceDetailsConciseRow from "../DeviceDetailsConciseRow";

Enzyme.configure({adapter: new Adapter()});
jest.mock("axios");
jest.mock("../../model/DeviceInfo");
jest.spyOn(global.console, "error");
jest.spyOn(DeviceInfo, "getConciseProperties");

describe("DeviceDetailsConciseTable", () => {
    let wrapper;

    beforeEach(() => {
        const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 1]);

        const dummyResponse = ["1", "2", "3"];
        DeviceInfo.getConciseProperties.mockImplementation(() => {
            return dummyResponse;
        });

        wrapper = Enzyme.shallow(
            <DeviceDetailsConciseTable device={dummyDevice}/>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Call DeviceInfo.getConciseProperties()", () => {
        expect(DeviceInfo.getConciseProperties).toHaveBeenCalled();
    });
    it("Renders the correct number of properties", () => {
        expect(wrapper.find(DeviceDetailsConciseRow)).toHaveLength(3);
    });
});
