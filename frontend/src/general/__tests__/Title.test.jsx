import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {describe, expect, it } from "@jest/globals";
import Title from "../Title"

import { Box } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });
describe("<Title/> functional Component", ()=>{
    const dummyTitle = "testString"
    const wrapper = Enzyme.shallow(<Title title ={dummyTitle}/>);

    it("returns a component with the correct composition", ()=>{
        expect(wrapper.find(Box)).toHaveLength(1);
        
        const box = wrapper.find(Box).first();
        expect(box.props().className).toBe("flexContents headerAreaUnderline");

        expect(wrapper.find(".title")).toHaveLength(1);

        const title = wrapper.find(".title").first();
        expect(title.text()).toBe(dummyTitle);
    })
})
