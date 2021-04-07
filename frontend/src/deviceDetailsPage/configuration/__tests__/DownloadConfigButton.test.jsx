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
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("render() function renders a component that", () => {
    it("Contains one <Button/> component with expected props", () => {
      expect(wrapper.find(Button)).toHaveLength(1);

      const props = wrapper.find(Button).first().props();

      const expected = {
        variant: "contained",
        color: "primary",
        onClick: wrapper.instance().handleDownload,
        startIcon: <GetApp />,
        disabled: !dummyDevice.extras
      };
      expect(props.variant).toBe(expected.variant);
      expect(props.color).toBe(expected.color);
      expect(props.onClick).toBe(expected.onClick);
      expect(props.startIcon).toStrictEqual(expected.startIcon);
      expect(props.disabled).toBe(expected.disabled);
    });
  });
  describe("handleDownload() function", () => {
    it("when device.configuration is set, calls expected functions", () => {
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
    it("when device.configuration is not set, calls nothing", () => {
      wrapper = Enzyme.shallow(
        <DownloadConfigButton device={new DeviceInfo()} />
      );

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
        styleDisplay: "yes"
      };

      wrapper.instance().handleDownload();

      expect(document.createElement).not.toBeCalled();
      expect(mockSetAttribute).not.toBeCalled();
      expect(dummyElement.style.display).toBe(expected.styleDisplay);
      expect(document.body.appendChild).not.toBeCalled();
      expect(dummyElement.click).not.toBeCalled();
      expect(document.body.removeChild).not.toBeCalled();
    });
  });
});
