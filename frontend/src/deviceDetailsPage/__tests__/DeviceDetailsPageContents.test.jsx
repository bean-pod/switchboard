import React from "react";
import { Grid } from "@material-ui/core";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it, beforeEach } from "@jest/globals";

import DeviceInfo from "../../model/DeviceInfo";
import DeviceDetailsPageContents from "../DeviceDetailsPageContents";
import GridColumn from "../../general/dashboard/GridColumn";
import DeleteDeviceDialogOpener from "../DeleteDeviceDialog/DeleteDeviceDialogOpener";
import DeviceLogCard from "../cards/DeviceLogCard";
import DeviceInfoCard from "../cards/DeviceInfoCard";
import DeviceChannelCard from "../cards/DeviceChannelCard";
import DeviceConfigActionsCard from "../cards/DeviceConfigActionsCard";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceDetailsPageContents/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, [1, 1], "encoder", [
      2,
      2
    ]);

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <DeviceDetailsPageContents device={dummyDevice} />
      );
    });
    it("Contains 5 <Grid/> Components", () => {
      expect(wrapper.find(Grid)).toHaveLength(5);
    });
    it("First <Grid/> Component has expected props", () => {
      const expected = {
        container: true,
        spacing: 3,
        children: "GridColumn"
      };
      const props = wrapper.find(Grid).at(0).props();
      expect(props.container).toBe = expected.container;
      expect(props.spacing).toBe = expected.spacing;
    });
    it("Second <Grid/> Component has expected props", () => {
      const expected = {
        item: true,
        xs: 12,
        children: "DeviceInfoCard"
      };
      const props = wrapper.find(Grid).at(1).props();
      expect(props.item).toBe = expected.item;
      expect(props.xs).toBe = expected.xs;
      expect(props.children.type.name).toBe(expected.children);
    });
    it("Third <Grid/> Component has expected props", () => {
      const expected = {
        item: true,
        xs: 12,
        children: "DeviceChannelCard"
      };
      const props = wrapper.find(Grid).at(2).props();
      expect(props.item).toBe = expected.item;
      expect(props.xs).toBe = expected.xs;
      expect(props.children.type.name).toBe(expected.children);
    });
    it("Fourth <Grid/> Component has expected props", () => {
      const expected = {
        item: true,
        xs: 12,
        children: "DeviceConfigActionsCard"
      };
      const props = wrapper.find(Grid).at(3).props();
      expect(props.item).toBe = expected.item;
      expect(props.xs).toBe = expected.xs;
      expect(props.children.type.name).toBe(expected.children);
    });
    it("Fifth <Grid/> Component has expected props", () => {
      const expected = {
        item: true,
        xs: 6,
        children: "DeviceLogCard"
      };
      const props = wrapper.find(Grid).at(4).props();
      expect(props.item).toBe = expected.item;
      expect(props.xs).toBe = expected.xs;
      expect(props.children.type.name).toBe(expected.children);
    });

    it("Contains 1 <GridColumn/> Component", () => {
      expect(wrapper.find(GridColumn)).toHaveLength(1);
    });
    it("Contains 1 <DeviceInfoCard/> Component", () => {
      expect(wrapper.find(DeviceInfoCard)).toHaveLength(1);
    });
    it("Contains 1 <DeviceChannelCard/> Component", () => {
      expect(wrapper.find(DeviceChannelCard)).toHaveLength(1);
    });
    it("Contains 1 <DeviceConfigActionsCard/> Component", () => {
      expect(wrapper.find(DeviceConfigActionsCard)).toHaveLength(1);
    });
    it("Contains 1 <DeviceLogCard/> Component", () => {
      expect(wrapper.find(DeviceLogCard)).toHaveLength(1);
    });
    it("Contains 1 <DeleteDeviceDialogOpener/> Component", () => {
      expect(wrapper.find(DeleteDeviceDialogOpener)).toHaveLength(1);
    });
  });
});
