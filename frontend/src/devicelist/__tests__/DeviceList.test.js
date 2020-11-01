import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"
import DeviceList from '../DeviceList';
import * as SampleData from '../../api/SampleData'
import ReactTestUtils from 'react-dom/test-utils'

let container = null;
let sampleSenders = null;
let sampleReceivers = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    // Get sample data for the purpose of asserting
    SampleData.getSenders((senders) => {
        sampleSenders = senders;
    })
    SampleData.getReceivers((receivers) => {
        sampleReceivers = receivers;
    })
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

    verifyStaticElements();

    var devices = document.getElementsByClassName("singleDeviceRow");
    expect(devices).not.toBe(null);
    expect(devices.length).toBe(sampleSenders.length);

    sampleSenders.forEach((sender, index) => {
        var rowElements = devices[index].querySelectorAll("td");
        expect(rowElements[0].querySelector("button span svg")).not.toBe(null);
        expect(rowElements[1].textContent).toBe(sender.name);
        expect(rowElements[2].textContent).toBe(sender.serial);
        expect(rowElements[3].firstChild.textContent).toBe(sender.status);
        expect(rowElements[4].textContent).toBe(sender.ip);
        expect(rowElements[5].textContent).toBe(sender.port.toString());
        expect(rowElements[6].querySelector("button span svg")).not.toBe(null);
    })
})

test("Clicking receivers tabs renders the receiver list ", () => {
    act(() => {
        render(<DeviceList dataSource={SampleData}/>, container);
    })

    verifyStaticElements();

    var receiverTabButton = document.getElementById("vertical-tab-1")
    act(() => {
        ReactTestUtils.Simulate.click(receiverTabButton);
    })

    var devices = document.getElementsByClassName("singleDeviceRow");
    expect(devices).not.toBe(null)
    expect(devices.length).toBe(sampleReceivers.length);

    sampleReceivers.forEach((receiver, index) => {
        var rowElements = devices[index].querySelectorAll("td");
        expect(rowElements[0].querySelector("button span svg")).not.toBe(null);
        expect(rowElements[1].textContent).toBe(receiver.name);
        expect(rowElements[2].textContent).toBe(receiver.serial);
        expect(rowElements[3].firstChild.textContent).toBe(receiver.status);
        expect(rowElements[4].textContent).toBe(receiver.ip);
        expect(rowElements[5].textContent).toBe(receiver.port.toString());
        expect(rowElements[6].querySelector("button span svg")).not.toBe(null);
    })
})

test("Clicking dropdown on table row displays additional information", () => {
    act(() => {
        render(<DeviceList dataSource={SampleData}/>, container);
    })

    verifyStaticElements();

    var dropdownButton = document.querySelectorAll("td.dropdownButton button")[0];
    act(() => {
        ReactTestUtils.Simulate.click(dropdownButton);
    })

    var textElement = document.querySelector("tr.deviceDetails td div div div div span.MuiTypography-caption")
    expect(textElement).not.toBe(null);
    expect(textElement.innerHTML).toBe("Additional Device details go here")
})

function verifyStaticElements() {
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

    var sortBy = document.querySelector("#sortBySelect");
    expect(sortBy).not.toBe(null);

    var senderTab = document.querySelector("#vertical-tab-0 span");
    expect(senderTab).not.toBe(null);
    expect(senderTab.textContent).toBe("Senders")

    var senderTab = document.querySelector("#vertical-tab-1 span");
    expect(senderTab).not.toBe(null);
    expect(senderTab.textContent).toBe("Receivers")
}