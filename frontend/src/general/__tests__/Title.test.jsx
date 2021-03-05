import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Box } from "@material-ui/core";
import Title from "../Title";
import TitleButtons from "../TitleButtons";

Enzyme.configure({ adapter: new Adapter() });
describe("<Title/> functional Component", () => {
  const dummyTitle = "testString";
  let wrapper;

  describe("returns a component with the correct composition", () => {
    it("if props contain deviceList={false}", ()=>{
      wrapper = Enzyme.shallow(<Title title={dummyTitle} />);
      expect(wrapper.find(Box)).toHaveLength(1);
  
      const box = wrapper.find(Box).first();
      expect(box.props().className).toBe("flexContents headerAreaUnderline");

      expect(wrapper.find(".title")).toHaveLength(1);
      
      const title = wrapper.find(".title").first();
      expect(title.text()).toBe(dummyTitle);
      
      expect(wrapper.find(TitleButtons)).toHaveLength(0);
    })
    it("if props contain deviceList={true}", ()=>{
      wrapper = Enzyme.shallow(<Title title={dummyTitle} deviceList/>);
      expect(wrapper.find(Box)).toHaveLength(1);
  
      const box = wrapper.find(Box).first();
      expect(box.props().className).toBe("flexContents headerAreaUnderline");

      expect(wrapper.find(".title")).toHaveLength(1);
      
      const title = wrapper.find(".title").first();
      expect(title.text()).toBe(dummyTitle);
      
      expect(wrapper.find(TitleButtons)).toHaveLength(1);
    })
  });
});
