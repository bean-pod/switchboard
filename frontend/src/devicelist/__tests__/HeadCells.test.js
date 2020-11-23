import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HeadCells from "../HeadCells";

Enzyme.configure({ adapter: new Adapter() });

describe("<HeadCells/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<HeadCells />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Change State", () => {
    it("Should call setState", () => {
      const mockEvent = {
        target: {
          name: "status",
          value: "Test"
        }
      };
      const expected = {
        status: "Test"
      };

      wrapper.instance().handleStatusChange(mockEvent);
      expect(wrapper.state()).toEqual(expected);
    });
  });
});
