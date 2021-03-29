import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import Page from "../../../general/Page";
import StreamStatisticsPage from "../StreamStatisticsPage";
import StreamStatisticsPageContents from "../StreamStatisticsPageContents";
import StreamStatisticsInfo from "../../../model/StreamStatistics/StreamStatisticsInfo";
import StreamStatsSendInfo from "../../../model/StreamStatistics/StreamStatsSendInfo";
import StreamStatsReceiveInfo from "../../../model/StreamStatistics/StreamStatsReceiveInfo";
import StreamStatsLinkInfo from "../../../model/StreamStatistics/StreamStatsLinkInfo";
import StreamStatsWindowInfo from "../../../model/StreamStatistics/StreamStatsWindowInfo";

import { getSampleStreamStats } from "../../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamStatisticsPage/> functional component", () => {
  let wrapper;
  const dummyStreamStats = new StreamStatisticsInfo(
    10,
    10,
    new StreamStatsWindowInfo(10, 10, 10),
    new StreamStatsLinkInfo(10, 10, 10),
    new StreamStatsSendInfo(10, 10, 10, 10, 10, 10, 10),
    new StreamStatsReceiveInfo(10, 10, 10, 10, 10, 10, 10, 10, 10)
  );
  const dummyStatsLocation = {
    state: {
      dummyStreamStats
    }
  };

  describe("when passed a location prop", () => {
    describe("returns a component that", () => {
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <StreamStatisticsPage location={dummyStatsLocation} />
        );
      });
      afterEach(() => {
        wrapper.unmount();
      });
      it("contains 1 Page component with expected props", () => {
        const expectedTitle = `Stream ${dummyStreamStats.id} Statistics`;
        const expectedBreadcrumbs = [
          ["Home", "/Home"],
          ["Active Streams", "/Streams"],
          ["Stream Details"],
          ["Statistics", `/Streams/Details/${dummyStreamStats.id}/Statistics`]
        ];

        const page = wrapper.find(Page);
        expect(page).toHaveLength(1);

        const pageProps = page.props();
        expect(pageProps.title).toBe(expectedTitle);
        expect(pageProps.breadcrumbs).toStrictEqual(expectedBreadcrumbs);
      });
      it("contains 1 StreamStatisticsPageContents component with expected props", () => {
        const contents = wrapper.find(StreamStatisticsPageContents);
        expect(contents).toHaveLength(1);

        const contentsProps = contents.props();
        expect(contentsProps.statistics).toStrictEqual(dummyStreamStats);
      });
    });
  });
  describe("when not passed a location prop", () => {
    describe("returns a component that", () => {
      const expectedDefaultStats = getSampleStreamStats();
      beforeEach(() => {
        wrapper = Enzyme.shallow(<StreamStatisticsPage />);
      });
      afterEach(() => {
        wrapper.unmount();
      });
      it("contains 1 Page component with expected props", () => {
        const expectedTitle = `Stream ${expectedDefaultStats.id} Statistics`;
        const expectedBreadcrumbs = [
          ["Home", "/Home"],
          ["Active Streams", "/Streams"],
          ["Stream Details"],
          [
            "Statistics",
            `/Streams/Details/${expectedDefaultStats.id}/Statistics`
          ]
        ];

        const page = wrapper.find(Page);
        expect(page).toHaveLength(1);

        const pageProps = page.props();
        expect(pageProps.title).toBe(expectedTitle);
        expect(pageProps.breadcrumbs).toStrictEqual(expectedBreadcrumbs);
      });
      it("contains 1 StreamStatisticsPageContents component with expected props", () => {
        const contents = wrapper.find(StreamStatisticsPageContents);
        expect(contents).toHaveLength(1);

        const contentsProps = contents.props();
        expect(contentsProps.statistics).toStrictEqual(expectedDefaultStats);
      });
    });
  });
});
