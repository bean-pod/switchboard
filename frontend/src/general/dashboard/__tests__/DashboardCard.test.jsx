import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import DashboardCard from "../DashboardCard"
import { Typography, Paper } from "@material-ui/core";


Enzyme.configure({ adapter: new Adapter() });

describe.only("<DashboardCard/> Component", () => {
    let wrapper;
    const dummyTitle = "Title";
    const dummyBody = "Body";

    describe(`render() with props title:${dummyTitle} children:${dummyBody}`, () => {

        wrapper = Enzyme.shallow(
            <DashboardCard title={dummyTitle}>
                {dummyBody}
            </DashboardCard>
        );

        describe("Contains 1 <Paper/> component", () => {
            expect(wrapper.find(Paper)).toHaveLength(1);
            it(`That has text "${dummyBody}"`, () => {
                const bodyBox = wrapper.find(Paper)
                expect(bodyBox.text())
            })
        });
        describe("Contains 1 <Typography/> component", () => {
            expect(wrapper.find(Typography)).toHaveLength(1);
            it(`That has title "${dummyTitle}"`, () => {
                const bodyBox = wrapper.find(Paper)
                expect(bodyBox.text())
            })
        });
    });
});
