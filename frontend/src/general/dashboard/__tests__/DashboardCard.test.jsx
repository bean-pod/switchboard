import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { Typography, Paper, Grid, Box } from "@material-ui/core";
import DashboardCard from "../DashboardCard";
import ButtonInfo from "../ButtonInfo";
import SmallCardButton from "../SmallCardButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<DashboardCard/> functional Component", () => {
  let wrapper;
  const dummyTitle = "Title";
  const dummyBody = "Body";

  describe(`when prop "button" is not passed`, () => {
    beforeAll(() => {
      wrapper = Enzyme.shallow(
        <DashboardCard title={dummyTitle}>{dummyBody}</DashboardCard>
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });
    describe(`returns a component that`, () => {
      it("Contains 1 <Paper/> component", () => {
        expect(wrapper.find(Paper)).toHaveLength(1);
      });
      it("Contains 1 <Typography/> component", () => {
        expect(wrapper.find(Typography)).toHaveLength(1);
        const bodyBox = wrapper.find(Typography);
        expect(bodyBox.text()).toBe(dummyTitle);
      });
      it("Contains 1 <Grid/> components with expected props", () => {
        expect(wrapper.find(Grid)).toHaveLength(1);
        const props = wrapper.find(Grid).at(0).props();
        const expected = {
          container: true,
          justify: "center",
          direction: "row",
          spacing: 3,
          children: [dummyBody, null]
        };

        expect(props.container).toBe(expected.container);
        expect(props.justify).toBe(expected.justify);
        expect(props.direction).toBe(expected.direction);
        expect(props.spacing).toBe(expected.spacing);
        expect(props.children).toStrictEqual(expected.children);
      });
    });
  });
  describe(`when prop "button" is passed`, () => {
    const dummyObj = { thing: "thing" };
    const button = new ButtonInfo("path", dummyObj, "buttonText");
    beforeAll(() => {
      wrapper = Enzyme.shallow(
        <DashboardCard title={dummyTitle} button={button}>
          {dummyBody}
        </DashboardCard>
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });
    describe(`returns a component that`, () => {
      it("Contains 1 <Paper/> component", () => {
        expect(wrapper.find(Paper)).toHaveLength(1);
        const props = wrapper.find(Paper).first().props();
        const expected = {
          className: "dashboardCard",
          elevation: 2
        };

        expect(props.className).toBe(expected.className);
        expect(props.elevation).toBe(expected.elevation);
      });
      it("Contains 1 <Typography/> component", () => {
        expect(wrapper.find(Typography)).toHaveLength(1);
        const bodyBox = wrapper.find(Typography);
        expect(bodyBox.text()).toBe(dummyTitle);
      });
      it("Contains 2 <Grid/> components with expected props", () => {
        expect(wrapper.find(Grid)).toHaveLength(2);
      });
      it("<GridComponent/> 0 contains expected props", () => {
        const props = wrapper.find(Grid).at(0).props();
        const expected = {
          container: true,
          justify: "center",
          direction: "row",
          spacing: 3,
          children: [dummyBody]
        };

        expect(props.container).toBe(expected.container);
        expect(props.justify).toBe(expected.justify);
        expect(props.direction).toBe(expected.direction);
        expect(props.spacing).toBe(expected.spacing);
        expect(props.children).toHaveLength(2);
        expect(props.children[0]).toBe(expected.children[0]);
      });
      it("<GridComponent/> 1 contains expected props", () => {
        const props = wrapper.find(Grid).at(1).props();
        const expected = {
          item: true,
          xs: 12
        };

        expect(props.item).toBe(expected.item);
        expect(props.xs).toBe(expected.xs);
      });
      it("Contains 1 <SmallCardButton/> components with expected props", () => {
        const component = wrapper.find(SmallCardButton);
        expect(component).toHaveLength(1);

        const props = component.at(0).props();
        const expected = {
          button
        };
        expect(props.button).toBe(expected.button);
      });
      it("Contains 1 <Box/> components with expected props", () => {
        const component = wrapper.find(Box);
        expect(component).toHaveLength(1);

        const props = component.at(0).props();
        const expected = {
          className: "alignRightFloatPadded"
        };
        expect(props.className).toBe(expected.className);
      });
    });
  });
});
