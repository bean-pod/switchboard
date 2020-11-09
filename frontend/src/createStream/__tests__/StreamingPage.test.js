import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils"

import * as SampleData from '../../api/SampleData'
import ReactTestUtils from 'react-dom/test-utils'
import { BrowserRouter } from "react-router-dom";

import StreamingPage from "../StreamingPage";
import StreamingTable from "../StreamingTable";
import SelectDevicesTable from "../SelectDevicesTable";
import SelectDeviceTableRow from "../SelectDeviceTableRow";


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

// Select Devices Table row
test("Select Devices Table Row renders properly and Inner dropdown opens",()=>{
    act(() => {
        render(
        <div id = "testRow">
           <SelectDeviceTableRow deviceDetails={sampleSenders[0]}/>
        </div>
        , container);
    })
    var testRow = document.getElementById("testRow");
    expect(testRow.childElementCount).toBe(1);
    expect(testRow.firstChild.textContent).toBe("Sender 1");

    var row = document.querySelector('[role="button"]');
    act(() => {
        ReactTestUtils.Simulate.click(row);
    })

    var collapse = document.getElementsByClassName("MuiCollapse-container MuiCollapse-entered")
    expect(collapse).not.toBe(null);
    var bean = document.getElementsByTagName("input")
    expect(bean).not.toBe(null);  
})

// Select Devices Table
test("Select Devices Table renders with Title, search bar and List with SelectDeviceTable Rows",()=>{
    act(() => {
        render(
        <BrowserRouter>
        <div id = "testSelectTable">
            <SelectDevicesTable name="Test Table" dataSource={sampleSenders} />
        </div>
        </BrowserRouter>
        , container);
    });

    var table = document.getElementById("testSelectTable");

    expect(table.childElementCount).toBe(3);
    var list = table.lastChild.firstChild;
 
    expect(table.children.item(0).textContent).toBe("Test Table");
    expect(table.children.item(1).className).toBe("searchField");

    expect(table.children.item(2)).not.toBe(null);
    expect(list.childElementCount).toBe(9);
    expect(list.firstChild).not.toBe(null);
        
})

// Streaming Table
test("Streaming Table has 2 tables and 1 button", () => {
    act(() => {
        render(
            <BrowserRouter>
                <div id="testingTable">
                    <StreamingTable dataSource={SampleData} />
                </div>
            </BrowserRouter>
            , container);
    })

    var form = document.getElementById("testingTable").firstChild;

    expect(form.tagName).toBe("FORM");
    expect(form.childElementCount).toBe(1);

    var table = form.firstChild;
    expect(table.childElementCount).toBe(3);
    
    expect(table.children.item(0).firstChild).not.toBe(null);
    expect(table.children.item(0).firstChild.id).toBe("SenderTable");

    expect(table.children.item(1)).not.toBe(null);
    expect(table.children.item(1).id).toBe("TableStartStreamingBtn");

    expect(table.children.item(2).firstChild).not.toBe(null);
    expect(table.children.item(2).firstChild.id).toBe("ReceiverTable");

})

// Streaming page
test("Streaming page has Breadcrumbs, Title and Streaming Table", () => {
    act(() => {
        render(
            <BrowserRouter>
                <StreamingPage dataSource={SampleData} streamSource={SampleData}/>
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
    expect(streamingTable.firstChild.tagName).toBe("FORM");
    expect(streamingTable.firstChild.firstChild.childElementCount).toBe(3);

})