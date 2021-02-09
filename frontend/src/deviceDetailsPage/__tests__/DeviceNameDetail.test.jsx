import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { describe, afterEach, beforeEach, expect, jest, it } from "@jest/globals";
import axios from "axios";
import { Box, Button, Container, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeviceNameDetail from "../DeviceNameDetail";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

const mockHistoryGo = jest.fn();
const mockHistory = {
    go: mockHistoryGo
};

jest.mock("react-router-dom", () => {
    // useHistory: () => {
    //     return mockHistory;
    // }
})

describe("DeviceNameDetail", () => {
    let wrapper;
    
    const setEditing = jest.fn();
    const handleClick = jest.spyOn(React, "useState");
    
    beforeEach(() => {
        handleClick.mockImplementation((editing) => [editing, setEditing]);
        wrapper = Enzyme.shallow(<DeviceNameDetail deviceName="Test Device" />);
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("When not editing", () => {
        it("Should render the correct number of child elements", () => {

        });
        describe("Edit button", () => {
            it("Should set the state to editing", () => {

            });
        });
    });
    describe("When editing", () => {
        beforeEach(() => {
            // simulate click to put us in editing mode
            wrapper.find("editBtn").simulate("click");
        })
        it("Should render the correct number of child elements", () => {
            
        });
        describe("Textfield", () => {
            it("Should show the device name as default text", () => {

            });
        });
        describe("Cancel Button", () => {
            it("Should set the state to not editing", () => {});
            it("Should not update the device's name", () => {});
        });
        describe("Confirm Button", () => {
            it("Should call the device API to update the device name", () => {});
            it("Should refresh the page and set the state to not editing", () => {});
        });
    });
    describe("After editing", () => {
        it("Should display the updated device name", () => {});
    });
});
