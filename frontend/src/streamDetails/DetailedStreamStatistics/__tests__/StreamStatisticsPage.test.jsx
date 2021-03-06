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

import { firstStreamResponse } from "../../../api/tests/StreamFixture";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamStatisticsPage/> functional component", () => {
  let wrapper;
  const dummyStream = firstStreamResponse;
  const dummyStreamStats = new StreamStatisticsInfo(
    1,
    102,
    new StreamStatsWindowInfo(21, 22, 23),
    new StreamStatsLinkInfo(31, 32, 33),
    new StreamStatsSendInfo(41, 42, 43, 44, 45, 46, 47),
    new StreamStatsReceiveInfo(51, 52, 53, 54, 55, 56, 57, 58, 59)
  );

  describe("when passed a location prop", () => {
    const dummyStatsLocation = {
      state: {
        statistics: dummyStreamStats,
        stream: dummyStream
      }
    };

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamStatisticsPage location={dummyStatsLocation} />
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });

    describe("returns a component that", () => {
      it("contains 1 Page component with expected props", () => {
        const expectedProps = {
          title: "Stream Statistics",
          breadcrumbs: [
            ["Home", "/Home"],
            ["Active Streams", "/Streams"],
            [
              "Stream Details",
              `/Streams/Details/${dummyStream.id}`,
              { stream: dummyStream }
            ],
            [
              "Statistics",
              `/Streams/Details/${dummyStream.id}/Statistics`,
              { statistics: dummyStreamStats, stream: dummyStream }
            ]
          ]
        };

        const page = wrapper.find(Page);
        expect(page).toHaveLength(1);

        const pageProps = page.props();
        expect(pageProps.title).toBe(expectedProps.title);
        expect(pageProps.breadcrumbs).toStrictEqual(expectedProps.breadcrumbs);
      });
      it("contains 1 StreamStatisticsPageContents component with expected props", () => {
        const contents = wrapper.find(StreamStatisticsPageContents);
        expect(contents).toHaveLength(1);

        const contentsProps = contents.props();
        expect(contentsProps.statistics).toStrictEqual(dummyStreamStats);
      });
    });
  });
});
