import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect } from "@jest/globals";

import DeviceListPage from "../DeviceListPage";
import Page from "../../general/Page";
import DeviceListTabTable from "../ContentsTable"

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceListPage/> functional component", ()=>{
    let wrapper;
    const datasource={
        dummyfunction: ()=>{}
    }

    beforeEach(()=>{
        wrapper=Enzyme.shallow(<DeviceListPage/>)
    })
 describe("returns a component that", ()=>{
     it("Contains 1 <Page/> component with the expected props", ()=>{
         const expectedTitle = "My Devices";
         const expectedBreadcumbs= [
            ["Home", "/"],
            ["My Devices", "Devices"]
          ];

         expect(wrapper.find(Page)).toHaveLength(1);

         const page = wrapper.find(Page).first();
         expect(page.props().title).toBe(expectedTitle);
         expect(page.props().breadcrumbs).toStrictEqual(expectedBreadcumbs);
     })
     it("Contains 1 <DeviceListTabTable/> component", ()=>{
         expect(wrapper.find(DeviceListTabTable)).toHaveLength(1);
     })
 })   
})