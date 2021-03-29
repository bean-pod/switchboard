import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";

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
    "encoder",
    "yabadoo"
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
    const returnedValue = wrapper.instance().handleDownload();
    expect(returnedValue).toBe(dummyDevice.configuration);
  });
});
