import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { BrowserRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core'

import HeaderBar from '../HeaderAppBar'

let container = null;
let expectedTheme = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }))
 
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
})
afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

test("Header renders correctly on load with correct theme", () => {
    act(() => {
        render(
            <BrowserRouter>
                <HeaderBar />
            </BrowserRouter>
            , container);
    })

    var title = document.querySelector("a.headerTitle");
    expect(title.innerHTML).toBe("Switchboard");

    var menuIcon = document.getElementsByClassName("menuButton");
    expect(menuIcon).not.toBe(null);

    var notifs = document.getElementById("notifBtn");
    expect(notifs).not.toBe(null);
    
    var account = document.getElementById("acctBtn");
    expect(account).not.toBe(null);
})