import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { IconButton, Tooltip } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import DeviceInfo from "../../../model/DeviceInfo";
import StreamInfo from "../../../model/StreamInfo";
import DetailsButton from "../DetailsButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceDetailsButton/> functional component", () => {
  let wrapper;
  let navLinkProps;
  let tooltipProps;
  const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 2]);
  const dummySender = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 2]);
  const dummyReceiver = new DeviceInfo(2, 2, 2, 2, 2, 2, [3, 4]);
  const dummyStream = new StreamInfo(1, dummySender, dummyReceiver, 2, 3);

  describe("returns a component where", () => {
    describe("If the <DetailsButton/> is for a Device Details page", () => {
      describe("the props of the <DetailsButton/> component are passed to components <NavLink/> and <Tooltip/>", () => {
        const navLinkInfoProp = {
          pathname: `/Devices/Details/${dummyDevice.serialNumber}`,
          state: {
            device: dummyDevice
          }
        };
        const tooltipTitleProp = "View Device Details";
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <DetailsButton
              navLinkInfo={navLinkInfoProp}
              tooltipTitle={tooltipTitleProp}
            />
          );
          navLinkProps = wrapper.find(NavLink).props();
          tooltipProps = wrapper.find(Tooltip).props();
        });
        afterEach(() => {
          wrapper.unmount();
        });
        it("contains 1 NavLink, 1 Tooltip, 1 IconButton and 1 Description component", () => {
          expect(wrapper.find(NavLink)).toHaveLength(1);
          expect(wrapper.find(Tooltip)).toHaveLength(1);
          expect(wrapper.find(IconButton)).toHaveLength(1);
          expect(wrapper.find(Description)).toHaveLength(1);
        });
        it("<DetailsButton/> navLinkInfo prop should be of a Device and passed as the <NavLink/> component's to prop", () => {
          expect(navLinkProps.to).toStrictEqual(navLinkInfoProp);
        });
        it("the <Tooltip/> title prop should say `View Device Details`", () => {
          expect(tooltipProps.title).toEqual(tooltipTitleProp);
        });
      });
    });
    describe("If the <DetailsButton/> is for a Stream Details page", () => {
      describe("the props of the <DetailsButton/> component are passed to components <NavLink/> and <Tooltip/>", () => {
        const navLinkInfoProp = {
          pathname: `/Streams/Details/${dummyStream.id}`,
          state: {
            stream: dummyStream
          }
        };
        const tooltipTitleProp = "View Stream Details";
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <DetailsButton
              navLinkInfo={navLinkInfoProp}
              tooltipTitle={tooltipTitleProp}
            />
          );
          navLinkProps = wrapper.find(NavLink).props();
          tooltipProps = wrapper.find(Tooltip).props();
        });
        afterEach(() => {
          wrapper.unmount();
        });
        it("contains 1 NavLink, 1 Tooltip, 1 IconButton and 1 Description component", () => {
          expect(wrapper.find(NavLink)).toHaveLength(1);
          expect(wrapper.find(Tooltip)).toHaveLength(1);
          expect(wrapper.find(IconButton)).toHaveLength(1);
          expect(wrapper.find(Description)).toHaveLength(1);
        });
        it("<DetailsButton/> navLinkInfo prop should be of a Stream and passed as the <NavLink/> component's to prop", () => {
          expect(navLinkProps.to).toStrictEqual(navLinkInfoProp);
        });
        it("the <Tooltip/> title prop should say `View Stream Details`", () => {
          expect(tooltipProps.title).toEqual(tooltipTitleProp);
        });
      });
    });
  });
});
