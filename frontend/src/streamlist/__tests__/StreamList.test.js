import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import StreamList from '../StreamList'
import * as SampleData from '../../api/SampleData'
import ReactTestUtils from 'react-dom/test-utils'

let container = null;
let sampleStreams = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    // get sample stream data for assertion
    SampleData.getStreams((streams) => {
        sampleStreams = streams;
    })
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

// stream list is a fragment that shows up at the bottom of the stream creation page
// according to mockups.
test("Stream list fragment renders title and stream list table", () => {
    act(() => {
        render(<StreamList dataSource={SampleData} />, container);
    })
    
    // check static title
    var title = document.querySelector("div.title");
    expect(title).not.toBe(null);
    expect(title.innerHTML).toBe("Current Streams");
    
    // check streams
    var streams = document.getElementsByClassName("singleStreamRow");
    expect(streams).not.toBe(null);
    expect(streams.length).toBe(sampleStreams.length);
    
    // check that stream info is rendering right
    sampleStreams.forEach((stream, index) => {
        var rowElements = streams[index].querySelectorAll("td");
        // chevron
        expect(rowElements[0].querySelector("button span svg")).not.toBe(null);
        // order: 1 id, 2 date, 3 sender name, 4 receiver name, 5 status, 6 type, 7 time, 8 actions
        expect(rowElements[1].textContent).toBe(stream.id.toString());
        expect(rowElements[2].textContent).toBe(stream.date);
        expect(rowElements[3].textContent).toBe(stream.sender.name);
        expect(rowElements[4].textContent).toBe(stream.receiver.name);
        expect(rowElements[5].querySelector("div svg")).not.toBe(null); // not checking that status is correct :/
        expect(rowElements[6].textContent).toBe(stream.type);
        expect(rowElements[7].textContent).toBe(stream.time);
        verifyActionButtons(rowElements[8]);
    })
})

function verifyActionButtons(rowElement){
    var buttonsConatiner = rowElement.firstChild;
    // check 3 buttons
    expect(buttonsConatiner.firstChild.querySelector("button span svg")).not.toBe(null);
    expect(buttonsConatiner.firstChild.nextSibling.querySelector("button span svg")).not.toBe(null);
    expect(buttonsConatiner.lastChild.querySelector("button span svg")).not.toBe(null);
}

test("Clicking dropdown on table row displays additional information", () => {
    act(() => {
        render(<StreamList dataSource={SampleData} />, container);
    })

    var dropdownButton = document.querySelectorAll("td.dropdownButton button")[0];
    act(() => {
        ReactTestUtils.Simulate.click(dropdownButton);
    })

    var additionalInfoElement = document.querySelector("tr.streamDetails td div div div div span.MuiTypography-caption");
    expect(additionalInfoElement).not.toBe(null);
    expect(additionalInfoElement.innerHTML).toBe("Additional Stream Details go here");
})