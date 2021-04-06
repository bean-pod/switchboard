import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
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
  const dummyColumns = [
    {
      title: "ID",
      field: "id"
    },
    {
      title: "Date",
      field: "date"
    }
  ];

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <StreamsTableWrapper dataSource={dummySource} columns={dummyColumns} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("Should contain the following component", () => {
    it("Contains 1 <StreamsTable/> component", () => {
      expect(wrapper.find(StreamsTable)).toHaveLength(1);
    });
    describe("<StreamsTable/> props", () => {
      it("Columns should passed <StreamsTableWrapper/>'s columns prop", () => {
        expect(wrapper.find(StreamsTable).props().columns).toBe(
          wrapper.props().columns
        );
      });
      it("Streams should passed <StreamsTableWrapper/>'s state streams", () => {
        expect(wrapper.find(StreamsTable).props().streams).toBe(
          wrapper.state().streams
        );
      });
    });
  });

  describe("handleStreamsChange()", () => {
    it("should set the state streams", () => {
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
