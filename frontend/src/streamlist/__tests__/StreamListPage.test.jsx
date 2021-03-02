import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { Box, Container } from "@material-ui/core";
import StreamListPage from "../StreamListPage";
import StreamTableWrapper from "../StreamTableWrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamListPage/> Component", () => {
  let wrapper;
  const dummyFunction = () => {};
  const dummySource = { dummyFunction };
  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamListPage dataSource={dummySource} />);
  });
  describe("Should contain the following components", () => {
    it("Contains 1 <Container/> component", () => {
      expect(wrapper.find(Container)).toHaveLength(1);
    });
    it("Contains 1 <Box/> component", () => {
      expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("Contains 1 <StreamTableWrapper/> component", () => {
      expect(wrapper.find(StreamTableWrapper)).toHaveLength(1);
    });
  });
});
