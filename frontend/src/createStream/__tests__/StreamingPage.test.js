import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"

import * as SampleData from '../../api/SampleData'
import ReactTestUtils from 'react-dom/test-utils'
import { BrowserRouter } from "react-router-dom";
import StreamingPage from "../StreamingPage";
import SelectDevicesTable from "../SelectDevicesTable";
import StreamingTable from "../StreamingTable";


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

// // Select Devices Table row
// test("Inner drop down opens",()=>{
//     act(() => {
//         render(
//         <BrowserRouter>
//            <SelectDeviceTableRow deviceDetails={sampleSenders[0]}/>
//         </BrowserRouter>
//         , container);
//     })
// })

// // Select Devices Table
// test("Table renders",()=>{
//     act(() => {
//         render(
//         <BrowserRouter>
//             <SelectDevicesTable dataSource={sampleSenders} />
//         </BrowserRouter>
//         , container);
//     });
// })

// // Streaming Table
// test("Has 2 tables as 1 button",()=>{
//     act(() => {
//         render(
//         <BrowserRouter>
//             <StreamingTable dataSource={SampleData} />
//         </BrowserRouter>
//         , container);
//     })
// })

// Streaming page
test("Streaming page has Breadcrumbs, Title and Streaming Table", () => {
    act(() => {
        render(
            <BrowserRouter>
                <StreamingPage dataSource={SampleData} />
            </BrowserRouter>
            , container);
    })

    var breadcrumbParent = document.getElementById("breadcrumbParent");
    var children = breadcrumbParent.children.item(0).children;

    expect(children.length).toBe(5);

    expect(children[0].firstChild.firstChild.textContent).toBe("Home");
    expect(children[0].firstChild.href).toBe("http://localhost/");
    expect(children[1].firstChild.data).toBe("/");
    expect(children[2].firstChild.firstChild.textContent).toBe("My Devices");
    expect(children[2].firstChild.href).toBe("http://localhost/Devices");
    expect(children[3].firstChild.data).toBe("/");
    expect(children[4].firstChild.firstChild.textContent).toBe("Streaming");
    expect(children[4].firstChild.href).toBe("http://localhost/Streaming");

    var title = document.querySelector("div.title");
    expect(title).not.toBe(null);
    expect(title.innerHTML).toBe("Streaming");

    var streamingTable = document.getElementById("StreamingTable");

    expect(streamingTable).not.toBe(null);
    expect(streamingTable.firstChild.childElementCount).toBe(3);

})