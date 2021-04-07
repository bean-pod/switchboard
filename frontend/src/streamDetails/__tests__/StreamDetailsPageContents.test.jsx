import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Box, Container, Grid } from "@material-ui/core";
import { beforeEach, describe, expect, it } from "@jest/globals";

import StreamDetailsPageContents from "../StreamDetailsPageContents";
import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamStatisticsCard from "../StreamStatisticsCard";
import StreamDetailsDeviceCard from "../StreamDetailsDeviceCard";
import DeleteStreamDialogOpener from "../DeleteStreamDialogOpener";

import DeviceInfo from "../../model/DeviceInfo";
import StreamInfo from "../../model/StreamInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamDetailsPageContents/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummySender = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 2]);
    const dummyReceiver = new DeviceInfo(2, 2, 2, 2, 2, 2, [3, 4]);
    const dummyStream = new StreamInfo(1, dummySender, dummyReceiver, 2, 3);
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamDetailsPageContents stream={dummyStream} />
      );
    });
    it("Contains 1 Container component with expected props", () => {
      expect(wrapper.find(Container)).toHaveLength(1);
    });
    it("Contains 5 Grid components with expected props", () => {
      const gridComponents = wrapper.find(Grid);

      expect(gridComponents).toHaveLength(5);

      const containerGridProps = gridComponents.at(0).props();
      expect(containerGridProps.container).toBe(true);
      expect(containerGridProps.spacing).toBe(3);

      let itemGridProps = gridComponents.at(1).props();
      expect(itemGridProps.item).toBe(true);
      expect(itemGridProps.xs).toBe(6);

      itemGridProps = gridComponents.at(2).props();
      expect(itemGridProps.item).toBe(true);
      expect(itemGridProps.xs).toBe(6);

      itemGridProps = gridComponents.at(3).props();
      expect(itemGridProps.item).toBe(true);
      expect(itemGridProps.xs).toBe(7);

      itemGridProps = gridComponents.at(4).props();
      expect(itemGridProps.item).toBe(true);
      expect(itemGridProps.xs).toBe(5);
    });
    it("Contains 1 DashboardCard components with expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);

      const logsCardProps = wrapper.find(DashboardCard).at(0).props();
      expect(logsCardProps.title).toBe("Logs");
    });
    it("Contains 2 StreamDetailsDeviceCard components with expected props", () => {
      const streamDeviceDetails = wrapper.find(StreamDetailsDeviceCard);
      expect(streamDeviceDetails).toHaveLength(2);

      const senderDetailsProps = streamDeviceDetails.at(0).props();
      expect(senderDetailsProps.device).toStrictEqual(dummySender);
      expect(senderDetailsProps.channel).toBe(2);

      const receiverDetailsProps = streamDeviceDetails.at(1).props();
      expect(receiverDetailsProps.device).toStrictEqual(dummyReceiver);
      expect(receiverDetailsProps.channel).toBe(3);
    });
    it("Contains 1 StreamStatisticsCard component with expected props", () => {
      const statsCard = wrapper.find(StreamStatisticsCard);
      expect(statsCard).toHaveLength(1);

      const statsCardProps = statsCard.props();
      expect(statsCardProps.streamId).toBe(1);
    });
    it("Contains 1 Box component with expected props", () => {
      const boxComponent = wrapper.find(Box);
      expect(boxComponent).toHaveLength(1);

      const boxProps = boxComponent.first().props();
      expect(boxProps.className).toBe("alignRightFloatPadded");
    });
    it("Contains 1 DeleteStreamDialogOpener component with expected props", () => {
      const deleteDialogOpener = wrapper.find(DeleteStreamDialogOpener);
      expect(deleteDialogOpener).toHaveLength(1);

      const deleteDialogOpenerProps = deleteDialogOpener.first().props();
      expect(deleteDialogOpenerProps.deleteId).toBe(1);
    });
  });
});
