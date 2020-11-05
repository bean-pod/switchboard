import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import DeviceListSortSelector from "../DeviceListSortSelector"

describe("<DeviceListSortSelector/>",()=>{
    let wrapper;
    const setState=jest.fn();
    const useStateSpy = jest.spyOn(React, "useState")
    
    beforeEach(() => {
        wrapper = Enzyme.shallow(<DeviceListSortSelector/>)
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Change State",()=>{
        it("Should call setState",()=>{
            const mockEvent = {
                target:{
                    name: "sortBy",
                    value: "Test"
                }
            };
            const expected={
                sort:"Test"
            };
    
            wrapper.instance().handleSortChange(mockEvent);
            expect(wrapper.state()).toEqual(expected);
        })
    })
})
