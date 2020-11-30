import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, expect, test } from "@jest/globals";
import DeviceListPage from "../DeviceListPage";
import * as SampleData from "../../api/SampleData";

function verifyStaticElements() {
  const title = document.querySelector("div.title");
  expect(title).not.toBe(null);
  expect(title.innerHTML).toBe("My Devices");

  const streamButton = document.getElementById("DeviceListStreamBtn");
  expect(streamButton).not.toBe(null);
  expect(streamButton.textContent).toBe("Stream");

  const addDeviceButton = document.getElementById("DeviceListAddDevBtn");
  expect(addDeviceButton).not.toBe(null);
  expect(addDeviceButton.textContent).toBe("Add Device");

  const senderTab = document.querySelector("#vertical-tab-0 span");
  expect(senderTab).not.toBe(null);
  expect(senderTab.textContent).toBe("Senders");

  const receiverTab = document.querySelector("#vertical-tab-1 span");
  expect(receiverTab).not.toBe(null);
  expect(receiverTab.textContent).toBe("Receivers");
}

let container = null;
let sampleSenders = null;
let sampleReceivers = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  // Get sample data for the purpose of asserting
  SampleData.getSenders((senders) => {
    sampleSenders = senders;
  });
  SampleData.getReceivers((receivers) => {
    sampleReceivers = receivers;
  });
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("Device list renders sender page by default", () => {
  act(() => {
    render(
      <BrowserRouter>
        <DeviceListPage dataSource={SampleData} />
      </BrowserRouter>,
      container
    );
  });

  verifyStaticElements();

  const devices = document.querySelectorAll("tr.MuiTableRow-root[index]");
  expect(devices).not.toBe(null);
  expect(devices.length).toBe(sampleSenders.length);

  sampleSenders.forEach((sender, index) => {
    const rowElements = devices[index].querySelectorAll("td");
    expect(rowElements[0].querySelector("button span svg")).not.toBe(null);
    expect(rowElements[1].textContent).toBe(sender.name);
    expect(rowElements[2].textContent).toBe(sender.serialNumber);
    expect(rowElements[3].firstChild.textContent).toBe(sender.status);
    expect(rowElements[4].textContent).toBe(sender.ip);
    expect(rowElements[5].querySelector("button span svg")).not.toBe(null);
  });
});

test("Clicking receivers tabs renders the receiver list ", () => {
  act(() => {
    render(
      <BrowserRouter>
        <DeviceListPage dataSource={SampleData} />
      </BrowserRouter>,
      container
    );
  });

  verifyStaticElements();

  const receiverTabButton = document.getElementById("vertical-tab-1");
  act(() => {
    ReactTestUtils.Simulate.click(receiverTabButton);
  });

  const devices = document.querySelectorAll("tr.MuiTableRow-root[index]");
  expect(devices).not.toBe(null);
  expect(devices.length).toBe(sampleReceivers.length);

  sampleReceivers.forEach((receiver, index) => {
    const rowElements = devices[index].querySelectorAll("td");
    expect(rowElements[0].querySelector("button span svg")).not.toBe(null);
    expect(rowElements[1].textContent).toBe(receiver.name);
    expect(rowElements[2].textContent).toBe(receiver.serialNumber);
    expect(rowElements[3].firstChild.textContent).toBe(receiver.status);
    expect(rowElements[4].textContent).toBe(receiver.ip);
    expect(rowElements[5].querySelector("button span svg")).not.toBe(null);
  });
});

test("Clicking dropdown on table row displays additional information", () => {
  act(() => {
    render(
      <BrowserRouter>
        <DeviceListPage dataSource={SampleData} />
      </BrowserRouter>,
      container
    );
  });

  verifyStaticElements();

  const dropdownButton = document.querySelector(
    "tr.MuiTableRow-root[index] button"
  );
  act(() => {
    ReactTestUtils.Simulate.click(dropdownButton);
  });

  const textElement = document.querySelector(
    "tr.MuiTableRow-root td.MuiTableCell-root[colspan] h6"
  );
  expect(textElement).not.toBe(null);
  expect(textElement.innerHTML).toBe("Channels");
});
