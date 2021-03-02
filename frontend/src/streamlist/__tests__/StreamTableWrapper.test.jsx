import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import StreamTableWrapper from "../StreamTableWrapper";
import StreamTable from "../StreamTable";
import StreamInfo from "../../model/StreamInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamTableWrapper/> Component", () => {
  let wrapper;
  const dummySource = {
    getAllStreams() {}
  };

  describe("Should contain the following components", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StreamTableWrapper dataSource={dummySource} />);
    });
    it("Contains 1 <StreamTable/> component", () => {
      expect(wrapper.find(StreamTable)).toHaveLength(1);
    });
  });

  describe("handleStreamsChange()", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StreamTableWrapper dataSource={dummySource} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should set the state", () => {
      const testValue = [new StreamInfo()];

      const defaultState = {
        streams: []
      };
      const expectedState = {
        streams: testValue
      };

      expect(wrapper.state()).toEqual(defaultState);
      wrapper.instance().handleStreamsChange(testValue);
      expect(wrapper.state()).toEqual(expectedState);
    });
  });
});
