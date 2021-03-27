import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import StreamsTableWrapper from "../StreamsTableWrapper";
import StreamsTable from "../StreamsTable";
import StreamsTableSimple from "../StreamsTableSimple";
import StreamInfo from "../../model/StreamInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamsTableWrapper/> Component", () => {
  let wrapper;
  const dummySource = {
    getAllStreams() {
      return Promise.resolve([]);
    }
  };

  afterEach(() => {
    wrapper.unmount();
  });

  describe("Should contain the following components", () => {
    it("if isSimple prop defaults to false, it contains 1 <StreamsTable/> component", () => {
      wrapper = Enzyme.shallow(
        <StreamsTableWrapper dataSource={dummySource} />
      );
      expect(wrapper.find(StreamsTable)).toHaveLength(1);
    });
    it("if isSimple prop is true, it contains 1 <StreamsTableSimple/> component", () => {
      wrapper = Enzyme.shallow(
        <StreamsTableWrapper dataSource={dummySource} isSimple />
      );
      expect(wrapper.find(StreamsTableSimple)).toHaveLength(1);
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
