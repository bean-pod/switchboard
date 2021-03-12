import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Box, Container, Grid } from "@material-ui/core";
import { beforeEach, describe, expect, it } from "@jest/globals";

import StreamDetailsWrapper from "../StreamDetailsWrapper";
import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamDeviceDetails from "../StreamDeviceDetails";
import DeleteStreamDialogOpener from "../DeleteStreamDialogOpener";

import DeviceInfo from "../../model/DeviceInfo";
import StreamInfo from "../../model/StreamInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamDetailsWrapper/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummySender = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 2]);
    const dummyReceiver = new DeviceInfo(2, 2, 2, 2, 2, 2, [3, 4]);
    const dummyStream = new StreamInfo(1, dummySender, dummyReceiver, 2, 3);
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StreamDetailsWrapper stream={dummyStream} />);
    });
    it("Contains 1 Container component", () => {
      expect(wrapper.find(Container)).toHaveLength(1);
    });
    it("Contains 5 Grid components", () => {
        const gridComponents = wrapper.find(Grid);
        
        expect(gridComponents).toHaveLength(5);
      // iterate through grid components to test each
      for (let i = 0; i < gridComponents.length; i++) {
        const gridProps = wrapper.find(Grid).at(i).props();

        if (i === 0) {
          // single container grid
          expect(gridProps.container).toBeTruthy();
          expect(gridProps.spacing).toBe(3);
        } else {
          // check item grids
          expect(gridProps.item).toBeTruthy();

          if (i > 0 && i < 3) {
            // first row
            expect(gridProps.xs).toBe(6);
          } else if (i === 3) {
            expect(gridProps.xs).toBe(7);
          } else {
            expect(gridProps.xs).toBe(5);
          }
        }
      }
    });
    it("Contains 4 DashboardCard components", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(4);

      const senderCardProps = wrapper.find(DashboardCard).at(0).props();
      expect(senderCardProps.title).toBe("Sender Details");

      const receiverCardProps = wrapper.find(DashboardCard).at(1).props();
      expect(receiverCardProps.title).toBe("Receiver Details");
      
      const logsCardProps = wrapper.find(DashboardCard).at(2).props();
      expect(logsCardProps.title).toBe("Logs");
      
      const statisticsCardProps = wrapper.find(DashboardCard).at(3).props();
      expect(statisticsCardProps.title).toBe("Statistics");
    });
    it("Contains 2 StreamDeviceDetails components", () => {
      const streamDeviceDetails = wrapper.find(StreamDeviceDetails)
      expect(streamDeviceDetails).toHaveLength(2);

      const senderDetailsProps = streamDeviceDetails.at(0).props();
      expect(senderDetailsProps.device).toStrictEqual(dummySender);
      expect(senderDetailsProps.channel).toBe(2);
      
      const receiverDetailsProps = streamDeviceDetails.at(1).props();
      expect(receiverDetailsProps.device).toStrictEqual(dummyReceiver);
      expect(receiverDetailsProps.channel).toBe(3);
    });
    it("Contains 1 Box component", () => {
      const boxComponent = wrapper.find(Box);
      expect(boxComponent).toHaveLength(1);
      
      const boxProps = boxComponent.first().props();
      expect(boxProps.className).toBe("alignRightFloatPadded");
    });
    it("Contains 1 DeleteStreamDialogOpener component", () => {
      const deleteDialogOpener = wrapper.find(DeleteStreamDialogOpener);
      expect(deleteDialogOpener).toHaveLength(1);

      const deleteDialogOpenerProps = deleteDialogOpener.first().props();
      expect(deleteDialogOpenerProps.deleteId).toBe(1);
    });
  });
});
