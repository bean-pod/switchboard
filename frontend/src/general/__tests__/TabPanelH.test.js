import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest, it } from "@jest/globals";
import { Box, Container } from "@material-ui/core";
import TabPanelH from "../TabPanelH";

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(global.console, "error");

describe("Horizontal Tab Panel TabPanelH", () => {
    let wrapper;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Throws an error when", () => {
        const goodValues = {
            index: 1,
            value: 9
        };
        it("Not called with props", () => {
            wrapper = Enzyme.shallow(<TabPanelH />);
            expect(console.error).toHaveBeenCalled();
        });
        it("called with an index that is not a number", () => {
            const badIndex = "BadIndex";
            wrapper = Enzyme.shallow(
                <TabPanelH index={badIndex} value={goodValues.value} />
            );
            expect(console.error).toHaveBeenCalled();
        });
        it("Does not render children if the index and value are different", () => {
            wrapper = Enzyme.shallow(
                <TabPanelH index={1} value={5}>
                    <div id="unique" />
                </TabPanelH>
            );

            expect(wrapper.children).toHaveLength(1);
            expect(wrapper.find(Box)).toHaveLength(0);
        });
    });
    it("Renders any children passed only if the index and value are the same", () => {
        wrapper = Enzyme.shallow(
            <TabPanelH index={1} value={1}>
                <div id="unique" />
            </TabPanelH>
        );

        expect(wrapper.children).toHaveLength(1);
        expect(wrapper.find(Box)).toHaveLength(1);
    });
});
