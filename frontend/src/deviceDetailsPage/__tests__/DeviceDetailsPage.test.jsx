import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";

import DeviceInfo from "../../model/DeviceInfo";
import DynamicBreadcrumb from "../../general/DynamicBreadcrumb";
import DeviceDetailsTabTable from "../DeviceDetailsTabTable";
import DeviceDetailsPageContents from "../DeviceDetailsPageContents";

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(global.console, "error");

describe("DeviceDetailsPageContents", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders the correct number of child elements", () => {
    const dummyLocation = {
      state: {
        device: new DeviceInfo(1, 1, 1, 1, 1, [1, 1], "encoder", [2, 2])
      }
    };

    wrapper = Enzyme.shallow(
      <DeviceDetailsPageContents location={dummyLocation} />
    );
    expect(wrapper.find(Container)).toHaveLength(1);
    expect(wrapper.find(DynamicBreadcrumb)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(3);
    expect(wrapper.find("DeviceNameDetail")).toHaveLength(1);
    expect(wrapper.find("DeleteDeviceButton")).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(3);
    expect(wrapper.find(DeviceDetailsTabTable)).toHaveLength(2);
  });
});
