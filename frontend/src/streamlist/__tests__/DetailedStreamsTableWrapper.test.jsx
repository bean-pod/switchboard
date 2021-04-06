import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, afterEach, describe, expect, it } from "@jest/globals";
import DetailedStreamsTableWrapper from "../DetailedStreamsTableWrapper";
import StatusIndicator from "../../general/StatusIndicator";
import StreamDetailsButton from "../StreamDetailsButton";
import StreamsTableWrapper from "../StreamsTableWrapper";
import * as SampleData from "../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<SimpleStreamsTableWrapper/> Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<DetailedStreamsTableWrapper />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Contains 1 <StreamsTableWrapper/> component with expected prop values", () => {
    expect(wrapper.find(StreamsTableWrapper)).toHaveLength(1);

    const streamsTableProps = wrapper.find(StreamsTableWrapper).props();
    expect(streamsTableProps.columns).toEqual(
      wrapper.instance().getDetailedColumns()
    );
  });

  describe("getDetailedColumns() function", () => {
    let result;

    beforeEach(() => {
      result = wrapper.instance().getDetailedColumns();
    });

    it("should return the expected column info to be passed as a prop to <StreamsTableWrapper/>", () => {
      const expected = [
        {
          title: "ID",
          field: "id"
        },
        {
          title: "Date",
          field: "date"
        },
        {
          title: "Sender",
          field: "sender.name"
        },
        {
          title: "Receiver",
          field: "receiver.name"
        },
        {
          title: "Status",
          field: "status"
        },
        {
          title: "Type",
          field: "type"
        },
        {
          title: "Time Elapsed",
          field: "time"
        },
        {
          title: "Actions",
          field: "action",
          filtering: false,
          sorting: false,
          align: "center",
          export: false
        }
      ];
      expect(result).toMatchObject(expected);
    });
    it(`Column 5 (status) has a render property that returns 1 <StatusIndicator/> with expected props`, () => {
      const dummyData = {
        status: "Online"
      };

      const expectedRenderFunction = function Status(rowData) {
        return <StatusIndicator status={rowData.status} />;
      };

      const expectedRenderResult = expectedRenderFunction(dummyData);
      expect(result[4].render(dummyData)).toMatchObject(expectedRenderResult);
    });
    it(`Column 8 (Actions) has a render property that returns 1 <StreamDetailsButton/> with expected props`, () => {
      const sampleStream = SampleData.getSampleStream();

      const expectedRenderFunction = function Actions(rowData) {
        return <StreamDetailsButton streamInfo={rowData} />;
      };

      const expectedRenderResult = expectedRenderFunction(sampleStream);
      expect(result[7].render(sampleStream)).toMatchObject(
        expectedRenderResult
      );
    });
  });
});
