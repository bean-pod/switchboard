import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, afterEach, describe, expect, it } from "@jest/globals";
import SimpleStreamTableWrapper from "../SimpleStreamTableWrapper";
import StatusIndicator from "../../general/StatusIndicator";
import StreamDetailsButton from "../StreamDetailsButton";
import StreamTableWrapper from "../StreamTableWrapper";
import * as SampleData from "../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<SimpleStreamTableWrapper/> Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<SimpleStreamTableWrapper />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Contains 1 <StreamTableWrapper/> component with expected prop values", () => {
    expect(wrapper.find(StreamTableWrapper)).toHaveLength(1);

    const streamTableProps = wrapper.find(StreamTableWrapper).props();
    expect(streamTableProps.columns).toEqual(
      wrapper.instance().getSimpleColumns()
    );
  });

  describe("getSimpleColumns() function", () => {
    let result;

    beforeEach(() => {
      result = wrapper.instance().getSimpleColumns();
    });

    it("should return the expected column info to be passed as a prop to <StreamTableWrapper/>", () => {
      const expected = [
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
    it(`should have a render() function that returns a <StatusIndicator/> component in Status column`, () => {
      const dummyData = {
        status: "Online"
      };

      const expectedRenderFunction = function Status(rowData) {
        return <StatusIndicator status={rowData.status} />;
      };

      const expectedRenderResult = expectedRenderFunction(dummyData);
      expect(result[2].render(dummyData)).toMatchObject(expectedRenderResult);
    });
    it(`should have a render() function that returns a <StreamDetailsButton/> component in Actions column`, () => {
      const sampleStream = SampleData.getSampleStream();

      const expectedRenderFunction = function Actions(rowData) {
        return <StreamDetailsButton streamInfo={rowData} />;
      };

      const expectedRenderResult = expectedRenderFunction(sampleStream);
      expect(result[3].render(sampleStream)).toMatchObject(
        expectedRenderResult
      );
    });
  });
});
