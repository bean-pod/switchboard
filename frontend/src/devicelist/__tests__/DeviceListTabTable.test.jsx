import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import DeviceListTabTable from "../DeviceListTabTable";
import TabPanel from "../TabPanel";
import DevicesTable from "../DevicesTable";
import VerticalTabs from "../../general/VerticalTabs";
import { Box } from "@material-ui/core";



Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceListTabTable/> class component", ()=>{
    let wrapper;
    const mockGetSenders = jest.fn();
    const mockGetReceivers = jest.fn();
    const dummySource = {
        getSenders: mockGetSenders,
        getReceivers:mockGetReceivers
    };

    const dummyClass = {tabs:"SomeClass"}
    beforeEach(()=>{
        wrapper= Enzyme.shallow(<DeviceListTabTable dataSource={dummySource} classes={dummyClass}/>)
    })
    afterEach(() => {
        jest.clearAllMocks();
      });

    describe("render() function returns a component that", ()=>{
        it("Contains one <Box/> component with expected props", ()=>{
            expect(wrapper.find(Box)).toHaveLength(1);
            // TODO: validate props
            // const box = wrapper.find(Box).first();
        })
        it("Contains one <VerticalTabs/> component with expected props", ()=>{
            expect(wrapper.find(VerticalTabs)).toHaveLength(1);
            // TODO: validate props
            // const verticalTabs = wrapper.find(VerticalTabs).first();
        })
        it("Contains two <TabPanel/> components", ()=>{
            expect(wrapper.find(TabPanel)).toHaveLength(2);
        })
        it("First <TabPanel/> has expected props", ()=>{
            const panelProps = wrapper.find(TabPanel).first().props();
            const expectedIndex = 0;
            const expectedclassName="lightGreyBorder";
            
            expect(panelProps.value).toBe(wrapper.instance().state.value);
            expect(panelProps.index).toBe(expectedIndex);
            expect(panelProps.className).toBe(expectedclassName);
            expect(panelProps.children.type.name).toBe("DevicesTable")
        })
        it("Second <TabPanel/> has expected props", ()=>{
            const panelProps = wrapper.find(TabPanel).last().props();
            const expectedIndex = 1;
            const expectedclassName="lightGreyBorder";
            
            expect(panelProps.value).toBe(wrapper.instance().state.value);
            expect(panelProps.index).toBe(expectedIndex);
            expect(panelProps.className).toBe(expectedclassName);
            expect(panelProps.children.type.name).toBe("DevicesTable")
        })
        it("Contains two <DevicesTable/> components", ()=>{
            expect(wrapper.find(DevicesTable)).toHaveLength(2);
        })
        it("First <DevicesTable/> has expected props", ()=>{
            const deviceTableProps = wrapper.find(DevicesTable).first().props();
            const expectedTitle = "List of Senders";
            
            expect(deviceTableProps.devices).toBe(wrapper.instance().state.senders);
            expect(deviceTableProps.title).toBe(expectedTitle);
        })
        it("Second <DevicesTable/> has expected props", ()=>{
            const DeviceTableProps = wrapper.find(DevicesTable).last().props();
            const expectedTitle = "List of Receivers";
            
            expect(DeviceTableProps.devices).toBe(wrapper.instance().state.receivers);
            expect(DeviceTableProps.title).toBe(expectedTitle);

        })
    })
    it("handleValueChange() function sets state.value", ()=>{
        const someValue=57;
        wrapper.instance().handleValueChange(someValue);
        expect(wrapper.instance().state.value).toBe(someValue);
    })
    it("handleSendersChange() function sets state.senders", ()=>{
        const someValue=[null];
        wrapper.instance().handleSendersChange(someValue);
        expect(wrapper.instance().state.senders).toStrictEqual(someValue);
    })
    it("handleReceiversChange() function sets state.receivers", ()=>{
        const someValue=[null];
        wrapper.instance().handleReceiversChange(someValue);
        expect(wrapper.instance().state.receivers).toStrictEqual(someValue);
    })
    it("componentDidMount() function calls functions in the passed datasource", ()=>{
        wrapper.instance().componentDidMount();
        expect(mockGetSenders).toBeCalledWith(wrapper.instance().handleSendersChange);
        expect(mockGetReceivers).toBeCalledWith(wrapper.instance().handleReceiversChange);
    })
})