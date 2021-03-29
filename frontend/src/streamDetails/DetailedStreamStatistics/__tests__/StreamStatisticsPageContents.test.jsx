import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import { Grid } from "@material-ui/core";

import StreamStatisticsPageContents from "../StreamStatisticsPageContents";
import StatisticsOverviewCard from "../StatisticsOverviewCard";
import StatisticsSendingCard from "../StatisticsSendingCard";
import StatisticsReceivingCard from "../StatisticsReceivingCard";

import { getSampleStreamStats } from "../../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamStatisticsPageContents/> functional component", () => {
    let wrapper;
    const dummyStatistics = getSampleStreamStats();
    describe("returns a component that", () => {
        beforeEach(() => {
            wrapper = Enzyme.shallow(<StreamStatisticsPageContents statistics={dummyStatistics} />);
        });
        afterEach(() => {
          wrapper.unmount();
        });
        it("has 4 Grid components with expected props", () => {
            const grids = wrapper.find(Grid);
            expect(grids).toHaveLength(4);

            const gridOneProps = grids.at(0).props();
            expect(gridOneProps.container).toBe(true);
            expect(gridOneProps.spacing).toBe(3);

            const gridTwoProps = grids.at(1).props();
            expect(gridTwoProps.item).toBe(true);
            expect(gridTwoProps.xs).toBe(4);

            const gridThreeProps = grids.at(2).props();
            expect(gridThreeProps.item).toBe(true);
            expect(gridThreeProps.xs).toBe(4);

            const gridFourProps = grids.at(3).props();
            expect(gridFourProps.item).toBe(true);
            expect(gridFourProps.xs).toBe(4);
        });
        it("has 1 StatisticsOverviewCard component with expected props", () => {
            const card = wrapper.find(StatisticsOverviewCard);

            const cardProps = card.props();
            expect(cardProps.stats).toStrictEqual(dummyStatistics);
        });
        it("has 1 StatisticsSendingCard component with expected props", () => {
            const card = wrapper.find(StatisticsSendingCard);

            const cardProps = card.props();
            expect(cardProps.stats).toStrictEqual(dummyStatistics);
        });
        it("has 1 StatisticsReceivingCard component with expected props", () => {
            const card = wrapper.find(StatisticsReceivingCard);

            const cardProps = card.props();
            expect(cardProps.stats).toStrictEqual(dummyStatistics);
        });
    })
});
