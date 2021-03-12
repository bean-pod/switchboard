import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import StreamLogs from "../StreamLogs";
import LogsTableWrapper from "../../loglist/LogsTableWrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamLogs/> functional component", () => {
    let wrapper;

    const dummyLogSource = {
        getStreamLogs() {
            return jest.fn()
        }
    };

    describe("it returns a component that", () => {
        beforeEach(() => {
            wrapper = Enzyme.shallow(<StreamLogs logsSource={dummyLogSource}/>);
        });
        it("has 1 LogsTableWrapper component", () => {
            expect(wrapper.find(LogsTableWrapper)).toHaveLength(1);
        })
    });
});
