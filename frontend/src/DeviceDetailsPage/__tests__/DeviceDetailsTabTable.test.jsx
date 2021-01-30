import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {afterEach, describe, expect, jest, it} from "@jest/globals";
import {Tab} from "@material-ui/core";
import DeviceDetailsTabTable from "../DeviceDetailsTabTable";
import DeviceDetailsConciseTable from "../DeviceDetailsConciseTable";
import DeviceDetailsActivityPanel from "../TabPanels/DeviceDetailsActivityPanel";
import DeviceDetailsNotesPanel from "../TabPanels/DeviceDetailsNotesPanel";
import DeviceInfo from "../../model/DeviceInfo";
import HorizontalTabPanel from "../../general/HorizontalTabPanel";

Enzyme.configure({adapter: new Adapter()});
jest.spyOn(global.console, "error");
describe("DeviceDetailsTabTable class", () => {
    let wrapper;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Static Functions", () => {
        describe("getPanelContents()", () => {
            it('Returns a DeviceDetailsConciseTable component if passed "Overview"', () => {
                const dummyTabInfo = "Overview";
                const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

                wrapper = Enzyme.shallow(
                    <div>
                        {DeviceDetailsTabTable.getPanelContents(dummyTabInfo, dummyDevice)}
                    </div>
                );
                expect(wrapper.find(DeviceDetailsConciseTable)).toHaveLength(1);
            });
            it('Returns a DeviceDetailsActivityPanel component if passed "Activity Log"', () => {
                const dummyTabInfo = "Activity Log";
                const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

                wrapper = Enzyme.shallow(
                    <div>
                        {DeviceDetailsTabTable.getPanelContents(dummyTabInfo, dummyDevice)}
                    </div>
                );
                expect(wrapper.find(DeviceDetailsActivityPanel)).toHaveLength(1);
            });
            it('Returns a DeviceDetailsNotesPanel component if passed "Notes"', () => {
                const dummyTabInfo = "Notes";
                const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

                wrapper = Enzyme.shallow(
                    <div>
                        {DeviceDetailsTabTable.getPanelContents(dummyTabInfo, dummyDevice)}
                    </div>
                );
                expect(wrapper.find(DeviceDetailsNotesPanel)).toHaveLength(1);
            });
            it("Returns a div component if passed an invalid value", () => {
                const dummyTabInfo = "Not a valid Value";
                const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

                wrapper = Enzyme.shallow(
                    <div>
                        {DeviceDetailsTabTable.getPanelContents(dummyTabInfo, dummyDevice)}
                    </div>
                );
                expect(wrapper.children).toHaveLength(1);
                expect(wrapper.childAt(0).text()).toEqual("Whoops not a valid value");
            });
        });
    });
    describe("non-static functions", () => {
        describe("handleValueChange", () => {
            it("Should call setState", () => {
                const tabs = ["a", "b"];
                const device = null;

                wrapper = Enzyme.shallow(
                    <DeviceDetailsTabTable tabs={tabs} device={device}/>
                );

                const expected = {
                    value: 69
                };

                wrapper.instance().handleValueChange(null, 69);
                expect(wrapper.state()).toEqual(expected);
            });
        });
    });
    describe("render()", () => {
        describe("Renders the correct number of Tabs and Tab Panels", () => {
            it("when passed an array of length 2", () => {
                const tabs = ["a", "b"];
                const device = null;

                wrapper = Enzyme.shallow(
                    <DeviceDetailsTabTable tabs={tabs} device={device}/>
                );

                expect(wrapper.find(Tab)).toHaveLength(2);
                expect(wrapper.find(HorizontalTabPanel)).toHaveLength(2);
            });
            it("when passed an array of length 5", () => {
                const tabs = ["a", "b", "a", "b", "a"];
                const device = null;

                wrapper = Enzyme.shallow(
                    <DeviceDetailsTabTable tabs={tabs} device={device}/>
                );

                expect(wrapper.find(Tab)).toHaveLength(5);
                expect(wrapper.find(HorizontalTabPanel)).toHaveLength(5);
            });
        });

        it("Calls getPanelContents() with the correct tabInfo and device", () => {
            jest.spyOn(DeviceDetailsTabTable, "getPanelContents");

            const tabs = ["TEST VALUE"];
            const device = null;

            wrapper = Enzyme.shallow(
                <DeviceDetailsTabTable tabs={tabs} device={device}/>
            );

            expect(DeviceDetailsTabTable.getPanelContents).toHaveBeenCalledWith(
                tabs[0],
                device
            );
        });
    });
    it("Throws an error when using device that is not a DeviceInfo object", () => {
        const tabs = [""];
        const device = 454;

        wrapper = Enzyme.shallow(
            <DeviceDetailsTabTable tabs={tabs} device={device}/>
        );
        expect(console.error).toHaveBeenCalled();
    });
});
