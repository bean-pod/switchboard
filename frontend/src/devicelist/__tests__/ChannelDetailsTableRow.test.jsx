import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { afterEach, describe, expect, jest } from "@jest/globals";
import { TableCell, TableRow } from "@material-ui/core";
import InputChannelInfo from "../../model/InputChannelInfo";
import OutputChannelInfo from "../../model/OutputChannelInfo";
import ChannelDetailsTableRow from "../ChannelDetailsTableRow";

Enzyme.configure({ adapter: new Adapter() });

describe("ChannelDetailsTableRow", () => {
    let wrapper;
    const dummyId = 69;
    const dummyName = "TEST_NAME";
    const dummyPort = 1231
    const inChannel = new InputChannelInfo(dummyId, dummyName, dummyPort, null)
    const outChannel = new OutputChannelInfo(dummyId, dummyName, dummyPort, null)

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("contains all the correct Components", () => {
        wrapper = Enzyme.shallow(<ChannelDetailsTableRow channel={inChannel} />);
        it("Is one (1) TableRow Component", () => {
            expect(wrapper.find(TableRow)).toHaveLength(1)
        })
        it("Has three (3) TableCell Components", () => {
            expect(wrapper.find(TableCell)).toHaveLength(3)
        })
        it("the first TableCell Component contains the channel Id", () => {
            expect(wrapper.childAt(0).text()).toBe(`${dummyId}`);
        })
        it("the second TableCell Component contains the channel name", () => {
            expect(wrapper.childAt(1).text()).toBe(dummyName);
        })
        it("the third TableCell Component contains the channel port", () => {
            expect(wrapper.childAt(2).text()).toBe(`${dummyPort}`);
        })

    })
})