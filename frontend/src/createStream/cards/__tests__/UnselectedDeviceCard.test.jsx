import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { Button, Grid } from "@material-ui/core";

import UnselectedDeviceCard from "../UnselectedDeviceCard";
import DashboardCard from "../../../general/dashboard/DashboardCard";

Enzyme.configure({ adapter: new Adapter() });

describe("<UnselectedDeviceCard/> functional component", () => {
  let wrapper;
  const dummyTitle = "some Title";
  const mockOnClick = jest.fn();
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <UnselectedDeviceCard title={dummyTitle} onClick={mockOnClick} />
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });

  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const props = wrapper.find(DashboardCard).first().props();
      expect(props.title).toBe(dummyTitle);
    });
    it("Contains 1 <Grid/> component with expected props", () => {
      expect(wrapper.find(Grid)).toHaveLength(1);

      const props = wrapper.find(Grid).at(0).props();
      const expected = {
        item: true,
        xs: 4
      };
      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
    });
    it("Contains 1 <Button/> component with expected props", () => {
      expect(wrapper.find(Button)).toHaveLength(1);

      const props = wrapper.find(Button).at(0).props();
      const expected = {
        variant: "contained",
        color: "primary",
        onClick: mockOnClick,
        children: `Select ${dummyTitle}`
      };
      expect(props.variant).toBe(expected.variant);
      expect(props.color).toBe(expected.color);
      expect(props.onClick).toStrictEqual(expected.onClick);
      expect(props.children).toStrictEqual(expected.children);
    });
  });
});
