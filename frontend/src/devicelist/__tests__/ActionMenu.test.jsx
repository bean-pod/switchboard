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
import InChannelInfo from "../../model/InputChannelInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<ActionMenu />", () => {
  let wrapper;
  let testElement;

  beforeEach(() => {
    const dummyDevice = new DeviceInfo(
      "1:10:111:999",
      "2020-11-25 20:48:03",
      "175.214.12.96",
      "123:456",
      "Sender 1",
      "Online",
      null,
      "encoder",
      null
    );
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
