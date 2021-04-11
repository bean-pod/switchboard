import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, afterEach, describe, expect, it } from "@jest/globals";
import DetailedStreamTableWrapper from "../DetailedStreamTableWrapper";
import StatusIndicator from "../../general/StatusIndicator";
import StreamDetailsButton from "../StreamDetailsButton";
import StreamTableWrapper from "../StreamTableWrapper";
import * as SampleData from "../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<DetailedStreamTableWrapper/> Class Component", () => {
  let wrapper;
  let wrapperInstance;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<DetailedStreamTableWrapper />);
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains 1 <StreamTableWrapper/> component with expected props", () => {
        expect(wrapper.find(StreamTableWrapper)).toHaveLength(1);

        const streamsTableProps = wrapper.find(StreamTableWrapper).props();
        expect(streamsTableProps.columns).toStrictEqual(
          wrapperInstance.detailedColumns
        );
      });
    });
  });

  describe("detailedColumns variable", () => {
    it(`Column 5 (status) has a render property that returns 1 <StatusIndicator/> with expected props`, () => {
      const dummyData = {
        status: "Online"
      };
      const expectedRenderedComponent = (
        <StatusIndicator status={dummyData.status} />
      );

      expect(
        wrapperInstance.detailedColumns[4].render(dummyData)
      ).toStrictEqual(expectedRenderedComponent);
    });
    it(`Column 8 (Actions) has a render property that returns 1 <StreamDetailsButton/> with expected props`, () => {
      const sampleStream = SampleData.getSampleStream();

      const expectedRenderedComponent = (
        <StreamDetailsButton streamInfo={sampleStream} />
      );

      expect(
        wrapperInstance.detailedColumns[5].render(sampleStream)
      ).toStrictEqual(expectedRenderedComponent);
    });
  });
});
