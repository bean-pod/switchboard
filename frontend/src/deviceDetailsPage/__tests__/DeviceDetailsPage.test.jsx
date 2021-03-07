import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import Page from "../../general/Page";
import DeviceDetailsPageContents from "../DeviceDetailsPageContents";
import DeviceInfo from "../../model/DeviceInfo";
import { getSampleSender } from "../../api/SampleData";
import DeviceDetailsPage from "../DeviceDetailsPage";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceDetailsPage/> functional Component", () => {
  let wrapper;
  const dummyDevice = new DeviceInfo(
    "serial",
    "sometime",
    "public",
    "private",
    "someName",
    "Online",
    "encoder",
    "yabadoo"
  );
  const dummyLocation = {
    state: {
      device: dummyDevice
    }
  };
  describe("when passed a location prop", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<DeviceDetailsPage location={dummyLocation} />);
    });
    describe("returns a component that", () => {
      it("Contains one <Page/> component with the expected props", () => {
        const expectedTitle = "Device Details";
        const expectedBreadcumbs = [
          ["Home", "/Home"],
          ["My Devices", "/Devices"],
          ["Device Details", `/Devices/Details/${dummyDevice.serialNumber}`]
        ];

        expect(wrapper.find(Page)).toHaveLength(1);

        const props = wrapper.find(Page).first().props();
        expect(props.title).toBe(expectedTitle);
        expect(props.breadcrumbs).toStrictEqual(expectedBreadcumbs);
      });
      it("Contains one <DeviceDetailsPageContents/> component with expected props", () => {
        expect(wrapper.find(DeviceDetailsPageContents)).toHaveLength(1);

        const props = wrapper.find(DeviceDetailsPageContents).first().props();
        expect(props.device).toBeInstanceOf(DeviceInfo);
        expect(props.device).toStrictEqual(dummyDevice);
      });
    });
  });
  describe("when not passed a location prop", () => {
    const expectedDefaultDevice = getSampleSender();
    beforeEach(() => {
      wrapper = Enzyme.shallow(<DeviceDetailsPage />);
    });
    describe("returns a component that", () => {
      it("Contains one <Page/> component with the expected props", () => {
        const expectedTitle = "Device Details";
        const expectedBreadcumbs = [
          ["Home", "/Home"],
          ["My Devices", "/Devices"],
          [
            "Device Details",
            `/Devices/Details/${expectedDefaultDevice.serialNumber}`
          ]
        ];

        expect(wrapper.find(Page)).toHaveLength(1);

        const props = wrapper.find(Page).first().props();
        expect(props.title).toBe(expectedTitle);
        expect(props.breadcrumbs).toStrictEqual(expectedBreadcumbs);
      });
      it("Contains one <DeviceDetailsPageContents/> component with expected props", () => {
        expect(wrapper.find(DeviceDetailsPageContents)).toHaveLength(1);
        const props = wrapper.find(DeviceDetailsPageContents).first().props();
        expect(props.device).toBeInstanceOf(DeviceInfo);
        expect(props.device).toStrictEqual(expectedDefaultDevice);
      });
    });
  });
});
