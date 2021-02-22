import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import { afterEach, beforeEach, expect, test } from "@jest/globals";
import HomePage from "../HomePage";

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

test("HomePage has Breadcrumbs with correct href", () => {
  act(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
      container
    );
  });

  const breadcrumbParent = document.getElementById("breadcrumbParent");
  const { children } = breadcrumbParent.children.item(0);

  expect(children.length).toBe(1);

  expect(children[0].firstChild.firstChild.textContent).toBe("Home");
  expect(children[0].firstChild.href).toBe("http://localhost/");
});
