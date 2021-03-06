import React from "react";
import { Grid } from "@material-ui/core";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it, beforeEach } from "@jest/globals";

import DeviceInfo from "../../model/DeviceInfo";
import DeviceDetailsTabTable from "../DeviceDetailsTabTable";
import DeviceDetailsPageContents from "../DeviceDetailsPageContents";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceDetailsPageContents/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummyDevice= new DeviceInfo(1, 1, 1, 1, 1, [1, 1], "encoder", [2, 2]);

    beforeEach(()=>{
      wrapper = Enzyme.shallow(
        <DeviceDetailsPageContents device={dummyDevice} />
      );
    })
    it("Contains 3 Grid Components", ()=>{
      expect(wrapper.find(Grid)).toHaveLength(3);
    })
    it("Contains 2 <DeviceDetailsTabTable/> Components", ()=>{
      expect(wrapper.find(DeviceDetailsTabTable)).toHaveLength(2);
    })
  });
});
