import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { afterEach, beforeEach, expect, test, jest } from "@jest/globals";
import axios from "axios";
import StreamList from "../StreamList";
import * as SampleData from "../../api/SampleData";

jest.mock("axios");
let container = null;
let sampleStreams = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  // get sample stream data for assertion
  SampleData.getAllStreams((streams) => {
    sampleStreams = streams;
  });
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function verifyActionButtons(rowElement) {
  const buttonsConatiner = rowElement.firstChild;
  // check 3 buttons
  expect(buttonsConatiner.firstChild.querySelector("button span svg")).not.toBe(
    null
  );
  expect(
    buttonsConatiner.firstChild.nextSibling.querySelector("button span svg")
  ).not.toBe(null);
  expect(buttonsConatiner.lastChild.querySelector("button span svg")).not.toBe(
    null
  );
}

// stream list is a fragment that shows up at the bottom of the stream creation page
// according to mockups.
test("Stream list fragment renders title and stream list table", () => {
  act(() => {
    render(<StreamList dataSource={SampleData} />, container);
  });

  // check static title
  const title = document.querySelector("div.title");
  expect(title).not.toBe(null);
  expect(title.innerHTML).toBe("Current Streams");

  // check streams
  const streams = document.getElementsByClassName("singleStreamRow");
  expect(streams).not.toBe(null);
  expect(streams.length).toBe(sampleStreams.length);

  // check that stream info is rendering right
  sampleStreams.forEach((stream, index) => {
    const rowElements = streams[index].querySelectorAll("td");
    // chevron
    expect(rowElements[0].querySelector("button span svg")).not.toBe(null);
    // order: 1 id, 2 date, 3 sender name, 4 receiver name, 5 status, 6 type, 7 time, 8 actions
    expect(rowElements[1].textContent).toBe(stream.id.toString());
    expect(rowElements[2].textContent).toBe(stream.date);
    expect(rowElements[3].textContent).toBe(stream.sender.name);
    expect(rowElements[4].textContent).toBe(stream.receiver.name);
    expect(rowElements[5].firstChild.textContent).toBe(stream.status); // not checking that status is correct :/
    expect(rowElements[6].textContent).toBe(stream.type);
    expect(rowElements[7].textContent).toBe(stream.time);
    verifyActionButtons(rowElements[8]);
  });
});

test("Clicking dropdown on table row displays additional information", () => {
  act(() => {
    render(<StreamList dataSource={SampleData} />, container);
  });

  const dropdownButton = document.querySelectorAll(
    "td.dropdownButton button"
  )[0];
  act(() => {
    ReactTestUtils.Simulate.click(dropdownButton);
  });

  const additionalInfoElement = document.querySelector(
    "tr.streamDetails td div div div div span.MuiTypography-caption"
  );
  expect(additionalInfoElement).not.toBe(null);
  expect(additionalInfoElement.innerHTML).toBe(
    "Additional Stream Details go here"
  );
});

function clickDelete() {
  const deleteButton = document.querySelectorAll("td.actionButtons button")[2];
  act(() => {
    ReactTestUtils.Simulate.click(deleteButton);
  });
}

test("Clicking the delete button shows appropriate popup dialog", () => {
  act(() => {
    render(<StreamList dataSource={SampleData} />, container);
  });

  // get delete dialog
  clickDelete();

  // check title
  const dialogTitle = document.getElementById("delete-stream-dialog-title");
  expect(dialogTitle.textContent).toBe("Confirm Delete");

  // check description
  const dialogDescription = document.getElementById(
    "delete-stream-dialog-description"
  );
  expect(dialogDescription.textContent).toBe(
    "Are you sure you want to end stream 1?"
  );

  // check buttons
  const dialogButtons = document.querySelectorAll(
    "div.MuiDialogActions-root button"
  );
  expect(dialogButtons[0].textContent).toBe("Cancel");
  expect(dialogButtons[1].textContent).toBe("Confirm");
});

test("Clicking outside the dialog or 'Cancel' should close the dialog", () => {
  act(() => {
    render(<StreamList dataSource={SampleData} />, container);
  });

  // get dialog
  clickDelete();
  // click cancel
  const cancelButton = document.querySelectorAll(
    "div.MuiDialogActions-root button"
  )[0];
  act(() => {
    ReactTestUtils.Simulate.click(cancelButton);
  });

  // try to get dialog and find it is null
  const dialog = document.getElementById("delete-stream-dialog");
  expect(dialog).toBeNull;
});

test("Clicking 'Confirm' should call axios.delete with the correct stream ID", () => {
  act(() => {
    render(<StreamList dataSource={SampleData} />, container);
  });

  axios.delete.mockImplementationOnce(() => Promise.resolve());

  // get dialog
  clickDelete();
  // click confirm
  const confirmButton = document.querySelectorAll(
    "div.MuiDialogActions-root button"
  )[1];
  act(() => {
    ReactTestUtils.Simulate.click(confirmButton);
  });

  // try to get dialog and find it is null
  const dialog = document.getElementById("delete-stream-dialog");
  expect(dialog).toBeNull;

  // expect axios.delete to have been called
  expect(axios.delete).toHaveBeenCalledWith(
    `${process.env.REACT_APP_STREAM}/1`
  );

  jest.clearAllMocks();
});
