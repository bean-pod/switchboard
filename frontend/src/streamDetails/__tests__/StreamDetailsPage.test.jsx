import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import Page from "../../general/Page";
import StreamDetailsPage from "../StreamDetailsPage";
import StreamDetailsPageContents from "../StreamDetailsPageContents";
import DeviceInfo from "../../model/DeviceInfo";
import StreamInfo from "../../model/StreamInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamDetailsPage/> functional component", () => {
  let wrapper;
  const dummySender = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 2]);
  const dummyReceiver = new DeviceInfo(2, 2, 2, 2, 2, 2, [3, 4]);
  const dummyStream = new StreamInfo(1, dummySender, dummyReceiver, 2, 3);

  const dummyStreamLocation = {
    state: {
      stream: dummyStream
    }
  };

  describe("when passed a location prop", () => {
    describe("returns a component that", () => {
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <StreamDetailsPage location={dummyStreamLocation} />
        );
      });
      it("contains one <Page/> component with expected props", () => {
        const expectedTitle = "Stream Details";
        const expectedBreadcrumbs = [
          ["Home", "/Home"],
          ["Active Streams", "/Streams"],
          [
            "Stream Details",
            `/Streams/Details/${dummyStream.id}`,
            { stream: dummyStream }
          ]
        ];

        expect(wrapper.find(Page)).toHaveLength(1);

        const props = wrapper.find(Page).first().props();
        expect(props.title).toBe(expectedTitle);
        expect(props.breadcrumbs).toStrictEqual(expectedBreadcrumbs);
      });
      it("contains one <StreamDetailsPageContents component with expected props", () => {
        expect(wrapper.find(StreamDetailsPageContents)).toHaveLength(1);

        const props = wrapper.find(StreamDetailsPageContents).first().props();
        expect(props.stream).toBeInstanceOf(StreamInfo);
        expect(props.stream).toStrictEqual(dummyStream);
      });
    });
  });
});
