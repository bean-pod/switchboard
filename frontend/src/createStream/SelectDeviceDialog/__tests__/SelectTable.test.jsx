import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect } from "@jest/globals";

import { List, ListItem, ListItemText } from "@material-ui/core";
import SelectTable from "../SelectTable";

Enzyme.configure({ adapter: new Adapter() });

describe("<SelectTable/> class component", () => {
  let wrapper;

  const dummyIndex = 5;
  const dummyItems = ["a", "b", "c", "d", "e", "f"];
  let mockSetIndex;

  beforeEach(() => {
    mockSetIndex = jest.fn();
    wrapper = Enzyme.shallow(
      <SelectTable
        selectedIndex={dummyIndex}
        setIndex={mockSetIndex}
        items={dummyItems}
      />
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains one <List/> component with expected props", () => {
        expect(wrapper.find(List)).toHaveLength(1);
      });
      it("Contains <ListItem/> components corresponding to the items prop passed", () => {
        expect(wrapper.find(ListItem)).toHaveLength(dummyItems.length);
      });
      it("<ListItem/> components have expected props", () => {
        const listItems = wrapper.find(ListItem);
        const props = listItems.at(0).props();
        const expected = {
          button: true,
          selected: false
        };

        expect(props.button).toBe(expected.button);
        expect(props.selected).toBe(expected.selected);

        props.onClick();
      });
      it("Contains <ListItemText/> components corresponding to the items prop passed", () => {
        expect(wrapper.find(ListItemText)).toHaveLength(dummyItems.length);
      });
      it("<ListItemText/> components have expected props", () => {
        const ListItemTexts = wrapper.find(ListItemText);
        const props = ListItemTexts.at(0).props();
        const expected = {
          primary: dummyItems[0]
        };

        expect(props.primary).toBe(expected.primary);
      });
    });
  });
  describe("handleListItemClick() function", () => {
    it("calls props.setIndex with passed value", () => {
      const argument = 43;
      wrapper.instance().handleListItemClick(argument);
      expect(mockSetIndex).toBeCalledWith(argument);
    });
  });
});
