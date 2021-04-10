import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { Grid } from "@material-ui/core";
import StreamStatisticsCard from "../StreamStatisticsCard";
import DashboardCard from "../../general/dashboard/DashboardCard";
import SimpleTable from "../../general/simpleTable/SimpleTable";
import ButtonInfo from "../../general/dashboard/ButtonInfo";
import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import StreamStatsWindowInfo from "../../model/StreamStatistics/StreamStatsWindowInfo";
import StreamStatsLinkInfo from "../../model/StreamStatistics/StreamStatsLinkInfo";
import StreamStatsSendInfo from "../../model/StreamStatistics/StreamStatsSendInfo";
import StreamStatsReceiveInfo from "../../model/StreamStatistics/StreamStatsReceiveInfo";

import { getSampleStreamStats, getSampleStream } from "../../api/SampleData";

import * as StreamApi from "../../api/StreamApi";
import * as SnackbarMessage from "../../general/SnackbarMessage";

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamStatisticsCard/> class component", () => {
  let wrapper;
  const dummyStream = getSampleStream();
  const dummyStats = getSampleStreamStats();
  const expectedProperties = {
    Time: dummyStats.time,
    "Round-Trip-Time": dummyStats.link.rtt,
    "Packets Retransmitted": dummyStats.send.packetsRetransmitted,
    "Packets Dropped": dummyStats.send.packetsDropped
  };
  const expectedState = {
    stats: dummyStats
  };
  const expectedButton = new ButtonInfo(
    `/Streams/Details/${dummyStream.id}/Statistics`,
    { statistics: dummyStats, stream: dummyStream },
    "More Statistics"
  );

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("componentDidMount() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StreamStatisticsCard stream={dummyStream} />, {
        disableLifecycleMethods: true
      });
    });
    describe("calls StreamApi.getStreamStatistics()", () => {
      it("if it resolves, it then calls handleStatsChange()", async () => {
        jest
          .spyOn(StreamApi, "getStreamStatistics")
          .mockResolvedValue(dummyStats);

        const handleStatsChangeSpy = jest.spyOn(
          wrapper.instance(),
          "handleStatsChange"
        );

        wrapper.instance().componentDidMount();

        expect(StreamApi.getStreamStatistics).toHaveBeenCalledWith(
          dummyStream.id
        );

        await new Promise(setImmediate);

        expect(handleStatsChangeSpy).toHaveBeenCalled();
      });
      it("if it rejects, an error snackbar with the caught error message is displayed", async () => {
        const returnedError = {
          message: "test"
        };
        jest
          .spyOn(StreamApi, "getStreamStatistics")
          .mockRejectedValue(returnedError);

        wrapper.instance().componentDidMount();

        await new Promise(setImmediate);

        expect(snackbarSpy).toHaveBeenCalledWith(
          "error",
          `Failed to fetch stream statistics: ${returnedError.message}`
        );
      });
    });
  });

  describe("<StreamStaticsCard/> class functions", () => {
    beforeEach(() => {
      jest
        .spyOn(StreamApi, "getStreamStatistics")
        .mockResolvedValue(dummyStats);
      wrapper = Enzyme.shallow(<StreamStatisticsCard stream={dummyStream} />);
    });
    describe("handleStatsChange() function", () => {
      it("should set the stats state", () => {
        const randomPreviousState = {
          stats: new StreamStatisticsInfo(
            1000,
            2000,
            new StreamStatsWindowInfo(12, 13, 14),
            new StreamStatsLinkInfo(15, 16, 17),
            new StreamStatsSendInfo(21, 22, 23, 24, 25, 26, 27),
            new StreamStatsReceiveInfo(31, 32, 33, 34, 35, 36, 37, 38, 39)
          )
        };
        wrapper.instance().setState(randomPreviousState);
        expect(wrapper.state()).toStrictEqual(randomPreviousState);
        wrapper.instance().handleStatsChange(dummyStats);
        expect(wrapper.state()).toStrictEqual(expectedState);
      });
    });
    describe("getProperties() function", () => {
      it("it should return a specific array of properties", () => {
        const actualProperties = wrapper.instance().getProperties();
        expect(actualProperties).toStrictEqual(expectedProperties);
      });
    });
    describe("getButton() function", () => {
      it("it should return appropriate button", () => {
        const actualButton = wrapper.instance().getButton();
        expect(actualButton).toStrictEqual(expectedButton);
      });
    });
    describe("render() function", () => {
      it("should render 1 DashboardCard with expected props", () => {
        const expectedProps = {
          title: "Statistics",
          button: expectedButton
        };

        const dashCard = wrapper.find(DashboardCard);
        expect(dashCard).toHaveLength(1);

        expect(dashCard.props().title).toBe(expectedProps.title);
        expect(dashCard.props().button).toStrictEqual(expectedProps.button);
      });
      it("should render 1 Grid component with expected props", () => {
        expect(wrapper.find(Grid)).toHaveLength(1);

        const expectedProps = { item: true, xs: 12 };
        const gridProps = wrapper.find(Grid).at(0).props();

        expect(gridProps.item).toBe(expectedProps.item);
        expect(gridProps.xs).toBe(expectedProps.xs);
      });
      it("should render 1 SimpleTable component with expected props", () => {
        const table = wrapper.find(SimpleTable);
        expect(table).toHaveLength(1);

        const tableProps = table.props();
        expect(tableProps.properties).toStrictEqual(expectedProperties);
      });
    });
  });
});
