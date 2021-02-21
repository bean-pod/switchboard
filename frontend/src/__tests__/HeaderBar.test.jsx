import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import { afterEach, beforeEach, expect, test } from "@jest/globals";
import HeaderBar from "../general/HeaderBar";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("Header renders correctly on load with correct theme", () => {
  act(() => {
    render(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
      container
    );
  });

  const title = document.querySelector("a.headerTitle");
  expect(title.innerHTML).toBe("Switchboard");

  const menuIcon = document.getElementsByClassName("menuButton");
  expect(menuIcon).not.toBe(null);

  const notifs = document.getElementById("notifBtn");
  expect(notifs).not.toBe(null);

  const account = document.getElementById("acctBtn");
  expect(account).not.toBe(null);
});
