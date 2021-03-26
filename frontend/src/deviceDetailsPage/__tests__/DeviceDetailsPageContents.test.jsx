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
    it("Contains 4 Grid Components", () => {
      expect(wrapper.find(Grid)).toHaveLength(4);
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
    it("Contains 1 <DeviceLogCard/> Component", () => {
      expect(wrapper.find(DeviceLogCard)).toHaveLength(1);
    });
    it("Contains 1 <DeleteDeviceDialogOpener/> Component", () => {
      expect(wrapper.find(DeleteDeviceDialogOpener)).toHaveLength(1);
    });
  });
});
