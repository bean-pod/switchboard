import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { describe, expect } from "@jest/globals";
import { TableCell, TableRow } from "@material-ui/core";
import ChannelDetailsTableHead from "../ChannelDetailsTableHead";

Enzyme.configure({ adapter: new Adapter() });

describe("ChannelDetailsTableHead", () => {
  let wrapper;

  describe("contains all the correct Components", () => {
    wrapper = Enzyme.shallow(<ChannelDetailsTableHead />);
    it("Is one (1) TableRow Component", () => {
      expect(wrapper.find(TableRow)).toHaveLength(1);
    });
    it("Has three (3) TableCell Components", () => {
      expect(wrapper.find(TableCell)).toHaveLength(3);
    });
    it('the first TableCell Component contains "ID"', () => {
      expect(wrapper.childAt(0).text()).toBe("ID");
    });
    it('the second TableCell Component contains "Name"', () => {
      expect(wrapper.childAt(1).text()).toBe("Name");
    });
    it('the third TableCell Component contains "port"', () => {
      expect(wrapper.childAt(2).text()).toBe("Port");
    });
  });
});
