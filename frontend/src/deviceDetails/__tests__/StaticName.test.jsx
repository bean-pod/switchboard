import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

import StaticName from "../StaticName";

Enzyme.configure({ adapter: new Adapter() });

describe("<StaticName/> functional Component", () => {
  let wrapper;
  const mockEdit = jest.fn();
  const dummyName = "someName";

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <StaticName deviceName={dummyName} startEditing={mockEdit} />
    );
  });
  describe("returns a component that", () => {
    it("Contains text with expected value", () => {
      expect(wrapper.text()).toBe(dummyName);
    });
    it("Contains 1 <div/> with expected props", () => {
      expect(wrapper.find(".alignRightFloat")).toHaveLength(1);
    });
    it("Contains 1 <IconButton/> component with expected props", () => {
      expect(wrapper.find(IconButton)).toHaveLength(1);

      const iconButtonProps = wrapper.find(IconButton).first().props();
      expect(iconButtonProps.id).toBe("editBtn");
      expect(iconButtonProps.color).toBe("action");
      expect(iconButtonProps.onClick).toBe(mockEdit);
    });
    it("Contains 1 <Edit/> icon component", () => {
      expect(wrapper.find(Edit)).toHaveLength(1);
    });
  });
});
