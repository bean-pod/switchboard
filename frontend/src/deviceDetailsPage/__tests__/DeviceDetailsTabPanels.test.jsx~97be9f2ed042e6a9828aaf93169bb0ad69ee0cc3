import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {describe, expect, jest, it} from "@jest/globals";
import {Container} from "@material-ui/core";

import DeviceDetailsActivityPanel from "../TabPanels/DeviceDetailsActivityPanel";
import DeviceDetailsNotesPanel from "../TabPanels/DeviceDetailsNotesPanel";

Enzyme.configure({adapter: new Adapter()});

jest.spyOn(global.console, "error");

describe("DeviceDetailsPanels", () => {
    let wrapper;
    describe("ActivityPanel", () => {
        it("Renders one Container component containing TODO comment", () => {
            wrapper = Enzyme.shallow(<DeviceDetailsActivityPanel/>);
            expect(wrapper.find(Container)).toHaveLength(1);
            expect(wrapper.text()).toBe("TODO: Design activity log");
        });
    });
    describe("NotesPanel", () => {
        it("Renders one Container component", () => {
            wrapper = Enzyme.shallow(<DeviceDetailsNotesPanel extras={[]}/>);
            expect(wrapper.find(Container)).toHaveLength(1);
        });
        it("Renders the text of the extras array passed", () => {
            wrapper = Enzyme.shallow(<DeviceDetailsNotesPanel extras={["TEST"]}/>);
            expect(wrapper.find(Container)).toHaveLength(1);
            expect(wrapper.text()).toBe("TEST");
        });
        it("Throws an error if no props are passed", () => {
            wrapper = Enzyme.shallow(<DeviceDetailsNotesPanel/>);
            expect(console.error).toHaveBeenCalled();
        });
        it("Throws an error if invalid props are passed", () => {
            wrapper = Enzyme.shallow(<DeviceDetailsNotesPanel extras=""/>);
            expect(console.error).toHaveBeenCalled();
        });
    });
});
