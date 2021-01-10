import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { afterEach, beforeEach, expect, test } from "@jest/globals";
import StreamList from "../StreamList";
import * as SampleData from "../../api/SampleData";

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

// stream list is a fragment that shows up at the bottom of the stream creation page
// according to mockups.
test("Stream list fragment renders title and streams fetched aren't null", () => {
  act(() => {
    render(<StreamList dataSource={SampleData} />, container);
  });

  // check static title
  const title = document.querySelector("div.title");
  expect(title).not.toBe(null);
  expect(title.innerHTML).toBe("Current Streams");

  // check streams aren't null
  expect(sampleStreams.length).not.toBe(null);

  // check streams
  const streams = document.querySelectorAll("tr.MuiTableRow-root[index]");
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
    expect(rowElements[3].textContent).toBe(stream.sender);
    expect(rowElements[4].textContent).toBe(stream.receiver);
    expect(rowElements[5].firstChild.textContent).toBe(stream.status); // not checking that status is correct :/
    expect(rowElements[6].textContent).toBe(stream.type);
    expect(rowElements[7].textContent).toBe(stream.time);
    verifyActionButtons(rowElements[8]);
  });
});

function verifyActionButtons(rowElement) {
  const buttonsContainer = rowElement.firstChild;
  // check 3 buttons
  expect(buttonsContainer.firstChild.querySelector("button span svg")).not.toBe(
    null
  );
  expect(
    buttonsContainer.firstChild.nextSibling.querySelector("button span svg")
  ).not.toBe(null);
  expect(buttonsContainer.lastChild.querySelector("button span svg")).not.toBe(
    null
  );
}

test("Clicking dropdown on table row displays additional information", () => {
  act(() => {
    render(<StreamList dataSource={SampleData} />, container);
  });

  const dropdownButton = document.querySelectorAll(
    "tr.MuiTableRow-root[index] button"
  )[0];
  act(() => {
    ReactTestUtils.Simulate.click(dropdownButton);
  });

  const additionalInfoElement = document.querySelector(
    "tr.MuiTableRow-root td.MuiTableCell-root[colspan] h6"
  );
  expect(additionalInfoElement).not.toBe(null);
  expect(additionalInfoElement.innerHTML).toBe(
    "Stream Details"
  );
});
