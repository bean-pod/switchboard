import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";

import DeviceConfigActionsCard from "../DeviceConfigActionsCard";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import UploadConfigDialogOpenButton from "../../configuration/UploadConfigDialogOpenButton";
import DownloadConfigButton from "../../configuration/DownloadConfigButton";
import DeviceInfo from "../../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceConfigActionsCard/> functional component", () => {
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

  const wrapper = Enzyme.shallow(
    <DeviceConfigActionsCard device={dummyDevice} />
  );

  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const dashboardCard = wrapper.find(DashboardCard).first();

      expect(dashboardCard.props().title).toBe("Configuration");
    });
    it("Contains 3 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(3);
    });
    it("First <Grid/> has expected props", () => {
      const props = wrapper.find(Grid).at(0).props();
      const expected = {
        container: true,
        justify: "center",
        direction: "row",
        spacing: 3
      };

      expect(props.container).toBe(expected.container);
      expect(props.justify).toBe(expected.justify);
      expect(props.direction).toBe(expected.direction);
      expect(props.spacing).toBe(expected.spacing);
    });
    it("Second <Grid/>  has expected props", () => {
      const props = wrapper.find(Grid).at(1).props();
      const expected = {
        item: true,
        xs: 4,
        children: "UploadConfigDialogOpenButton"
      };

      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
      expect(props.children.type.name).toBe(expected.children);
    });
    it("Third <Grid/>  has expected props", () => {
      const props = wrapper.find(Grid).at(2).props();
      const expected = {
        item: true,
        xs: 4,
        children: "DownloadConfigButton"
      };

      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
      expect(props.children.type.name).toBe(expected.children);
    });
    it("Contains 1 <UploadConfigDialogOpenButton/> component with expected props", () => {
      expect(wrapper.find(UploadConfigDialogOpenButton)).toHaveLength(1);

      const props = wrapper.find(UploadConfigDialogOpenButton).at(0).props();
      const expected = {
        device: dummyDevice
      };

      expect(props.device).toStrictEqual(expected.device);
    });
    it("Contains 1 <DownloadConfigButton/> component with expected props", () => {
      expect(wrapper.find(DownloadConfigButton)).toHaveLength(1);

      const props = wrapper.find(DownloadConfigButton).at(0).props();
      const expected = {
        device: dummyDevice
      };

      expect(props.device).toStrictEqual(expected.device);
    });
  });
});
