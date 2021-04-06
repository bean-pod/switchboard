import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, jest } from "@jest/globals";

import { Button } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import DownloadConfigButton from "../DownloadConfigButton";
import DeviceInfo from "../../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<DownloadConfigButton/> class", () => {
  let wrapper;
  const dummyDevice = new DeviceInfo(
    "serial",
    "sometime",
    "public",
    "private",
    "someName",
    "Online",
    [],
    "encoder",
    "dGhpcyBpcyBhIHRlc3Qgc3RyaW5n" // base 64 encoded string
  );
  dummyDevice.configuration = "a configuration";

  beforeEach(() => {
    wrapper = Enzyme.shallow(<DownloadConfigButton device={dummyDevice} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function renders a component that", () => {
    it("Contains one <Button/> component with expected props", () => {
      expect(wrapper.find(Button)).toHaveLength(1);

      const buttonProps = wrapper.find(Button).first().props();

      expect(buttonProps.variant).toBe("contained");
      expect(buttonProps.color).toBe("primary");
      expect(buttonProps.onClick).toBe(wrapper.instance().handleDownload);

      const expectedStartIcon = <GetApp />;
      expect(buttonProps.startIcon).toStrictEqual(expectedStartIcon);
    });
  });
  it("handleDownload() function returns expected value", () => {
    const mockSetAttribute = jest.fn();
    const mockClick = jest.fn();
    const dummyElement = {
      setAttribute: mockSetAttribute,
      click: mockClick,
      style: {
        display: "yes"
      }
    };
    jest.spyOn(document, "createElement").mockImplementation(() => {
      return dummyElement;
    });
    jest.spyOn(document.body, "appendChild").mockImplementation();
    jest.spyOn(document.body, "removeChild").mockImplementation();

    const expected = {
      createElement: "a",
      setAttribute: [
        ["href", `data:text/plain;charset=utf-8,${atob(dummyDevice.extras)}`],
        ["download", `${dummyDevice.serialNumber}.config`]
      ],
      styleDisplay: "none"
    };

    wrapper.instance().handleDownload();

    expect(document.createElement).toBeCalledWith(expected.createElement);
    expect(mockSetAttribute).toBeCalledTimes(2);
    expect(mockSetAttribute.mock.calls[0]).toMatchObject(
      expected.setAttribute[0]
    );
    expect(mockSetAttribute.mock.calls[1]).toMatchObject(
      expected.setAttribute[1]
    );
    expect(dummyElement.style.display).toBe(expected.styleDisplay);
    expect(document.body.appendChild).toBeCalledWith(dummyElement);
    expect(dummyElement.click).toBeCalled();
    expect(document.body.removeChild).toBeCalledWith(dummyElement);
  });
});
