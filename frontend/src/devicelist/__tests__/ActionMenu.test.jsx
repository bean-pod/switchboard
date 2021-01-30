import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  it
} from "@jest/globals";
import ActionMenu from "../ActionMenu";
import DeviceInfo from "../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<ActionMenu />", () => {
  let wrapper;
  let testElement;

  beforeEach(() => {
    const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, [1, 1], [2, 2]);
    wrapper = Enzyme.shallow(<ActionMenu device={dummyDevice} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Change State", () => {
    it("Should call setAnchorElement", () => {
      const mockEvent = {
        target: {
          name: "anchorElement",
          value: testElement
        }
      };
      const expected = {
        value: testElement
      };

      wrapper.instance().handleClick(mockEvent);
      expect(wrapper.state()).toEqual(expected);
    });
  });
});
