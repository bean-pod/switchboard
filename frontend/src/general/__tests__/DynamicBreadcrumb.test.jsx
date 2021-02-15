import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@material-ui/core";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import DynamicBreadCrumb from "../DynamicBreadcrumb";


Enzyme.configure({ adapter: new Adapter() });

describe("DynamicBreadcrumb", ()=>{
    let wrapper;

    it("Should create as many crumbs as values being passed",()=>{

        let megaCrumb7=[
            ["test1", "test"],
            ["test2", "test"],
            ["test3", "test"],
            ["test4", "test"],
            ["test5", "test"],
            ["test6", "test"],
            ["test7", "test"]
        ];

        wrapper = Enzyme.shallow(
            <DynamicBreadCrumb breadcrumbs={megaCrumb7}/>
        );
        expect(wrapper.find(Box)).toHaveLength(1);
        expect(wrapper.find(Breadcrumbs)).toHaveLength(1);
        expect(wrapper.find(Typography)).toHaveLength(7);  
        expect(wrapper.find(Link)).toHaveLength(7);  

    })

    it("Should create links corresponding to the value being passed", ()=>{
        let testCrumb=[
            ["test1", "/"],
            ["test2", "Banana"],
            ["test3", "47"]
        ];

        wrapper = Enzyme.shallow(
            <DynamicBreadCrumb breadcrumbs={testCrumb}/>
        );

        expect(wrapper.find('[href="/"]').length).toBe(1);
        expect(wrapper.find('[href="Banana"]').length).toBe(1);
        expect(wrapper.find('[href="47"]').length).toBe(1);
    })
})