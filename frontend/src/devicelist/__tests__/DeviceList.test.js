import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"
import DeviceList from '../DeviceList';
import * as SampleData from '../../api/SampleData'
import ReactTestUtils from 'react-dom/test-utils'

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

test("Device list renders sender page by default", () => {
    act(() => {
        render(<DeviceList dataSource={SampleData}/>, container);
    })

    var devices = document.getElementsByClassName("singleDeviceRow");
    expect(devices).not.toBe(null);
    expect(devices.length).toBe(9);

    var title = document.querySelector("div.title");
    expect(title).not.toBe(null);
    expect(title.innerHTML).toBe("My Devices");

    var streamButton = document.querySelector("button.green.buttonText span.MuiButton-label");
    expect(streamButton).not.toBe(null);
    expect(streamButton.textContent).toBe(" Stream");

    var addDeviceButton = document.querySelector("button.blue.buttonText span.MuiButton-label");
    expect(addDeviceButton).not.toBe(null);
    expect(addDeviceButton.textContent).toBe(" Add Device");

    var searchBar = document.querySelector("div.searchField div.MuiFormControl-root div.MuiInputBase-root input");
    expect(searchBar).not.toBe(null);
    expect(searchBar.getAttribute("placeholder")).toBe("Search");
})

test("Clicking receivers tabs renders the receiver list ", () => {
    act(() => {
        render(<DeviceList dataSource={SampleData}/>, container);
    })

    var receiverTabButton = document.getElementById("vertical-tab-1")
    act(() => {
        ReactTestUtils.Simulate.click(receiverTabButton);
    })

    var devices = document.getElementsByClassName("singleDeviceRow");
    expect(devices).not.toBe(null)
    expect(devices.length).toBe(19);
})

test("Clicking dropdown on table row displays additional information", () => {
    act(() => {
        render(<DeviceList dataSource={SampleData}/>, container);
    })

    var dropdownButton = document.querySelectorAll("td.dropdownButton button")[0];
    act(() => {
        ReactTestUtils.Simulate.click(dropdownButton);
    })

    var textElement = document.querySelector("tr.deviceDetails td div div div div span.MuiTypography-caption")
    expect(textElement).not.toBe(null);
    expect(textElement.innerHTML).toBe("Additional Device details go here")
})