import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import StreamsTableWrapper from "../StreamsTableWrapper";
import StreamsTable from "../StreamsTable";
import StreamInfo from "../../model/StreamInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamsTableWrapper/> Component", () => {
  let wrapper;
  const dummySource = {
    getAllStreams() {
      return Promise.resolve([]);
    }
  };

  describe("Should contain the following components", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamsTableWrapper dataSource={dummySource} />
      );
    });
    it("Contains 1 <StreamsTable/> component", () => {
      expect(wrapper.find(StreamsTable)).toHaveLength(1);
    });
  });

  describe("handleStreamsChange()", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamsTableWrapper dataSource={dummySource} />
      );
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
