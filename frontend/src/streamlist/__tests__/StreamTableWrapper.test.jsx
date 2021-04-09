import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import StreamTableWrapper from "../StreamTableWrapper";
import StreamTable from "../StreamTable";
import StreamInfo from "../../model/StreamInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamTableWrapper/> component", () => {
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
      <StreamTableWrapper dataSource={dummySource} columns={dummyColumns} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("Should contain the following component", () => {
    it("contains 1 <StreamTable/> component with expected props", () => {
      const table = wrapper.find(StreamTable);
      expect(table).toHaveLength(1);

      const wrapperProps = wrapper.props();
      const wrapperState = wrapper.state();
      const expected = {
        columns: wrapperProps.columns,
        streams: wrapperState.streams
      };

      const tableProps = table.props();
      expect(tableProps.columns).toBe(expected.columns);
      expect(tableProps.streams).toBe(expected.streams);
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
