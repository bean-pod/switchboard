import React from "react";
import ReactDOM from "react-dom";
import { describe, expect, it, jest } from "@jest/globals";
import AppRouter from "../app/AppRouter";

describe("index.jsx file", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call ReactDOM.render() with <AppRouter/> component", () => {
    jest.spyOn(ReactDOM, "render").mockImplementation(() => {});

    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
    
    // eslint-disable-next-line global-require
    require("../index");
    expect(ReactDOM.render).toBeCalledWith(<AppRouter />, root);
  });
});
