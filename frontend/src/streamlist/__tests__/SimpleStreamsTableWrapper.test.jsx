import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, afterEach, describe, expect, it } from "@jest/globals";
import SimpleStreamsTableWrapper from "../SimpleStreamsTableWrapper";
import StatusIndicator from "../../general/StatusIndicator";
import StreamDetailsButton from "../StreamDetailsButton";
import StreamsTableWrapper from "../StreamsTableWrapper";
import * as SampleData from "../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<SimpleStreamsTableWrapper/> Class Component", () => {
  let wrapper;
  let wrapperInstance;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<SimpleStreamsTableWrapper />);
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains 1 <StreamsTableWrapper/> component with expected prop values", () => {
        expect(wrapper.find(StreamsTableWrapper)).toHaveLength(1);

        const streamsTableProps = wrapper.find(StreamsTableWrapper).props();
        expect(streamsTableProps.columns).toStrictEqual(
          wrapper.instance().simpleColumns
        );
      });
    });
  });

  describe("simpleColumns variable", () => {
    it(`should have a render() function that returns a <StatusIndicator/> component in Status column`, () => {
      const dummyData = {
        status: "Online"
      };

      const expectedRenderedComponent = (
        <StatusIndicator status={dummyData.status} />
      );

      expect(wrapperInstance.simpleColumns[2].render(dummyData)).toStrictEqual(
        expectedRenderedComponent
      );
    });
    it(`should have a render() function that returns a <StreamDetailsButton/> component in Actions column`, () => {
      const sampleStream = SampleData.getSampleStream();

      const expectedRenderedComponent = (
        <StreamDetailsButton streamInfo={sampleStream} />
      );

      expect(
        wrapperInstance.simpleColumns[3].render(sampleStream)
      ).toStrictEqual(expectedRenderedComponent);
    });
  });
});
