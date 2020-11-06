import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import StreamingTable from "../StreamingTable";

class DummyData{

    getSenders(){
        return  ["A", "B", "C"];
    }
    
    getReceivers(){
        return ["X", "Y", "Z"];
    }
    
}
describe("<StreamingTable/>", () => {
    let wrapper;
    

    beforeEach(() => {

        wrapper = Enzyme.shallow(<StreamingTable dataSource={new DummyData()}/>)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("onSenderSelected", () => {
        it("should call setState and set selectedSender and selectedSenderID", () => {
            const mockEvent = {
                target: {
                    name: "selectedSenderID",
                    value: "0_Test2_Test3"
                }
            };
            const defaultState = {
                senders: [],
                receivers: [],
                selectedSender: {},
                selectedSenderID: "",
                selectedReceiver: {},
                selectedReceiverID: ""

            };
            
            const expected = {
                senders: [],
                receivers: [],
                
                selectedSender: undefined,
                selectedSenderID: "Test3",

                selectedReceiver: {},
                selectedReceiverID: ""

            };

            expect(wrapper.state()).toEqual(defaultState)
            wrapper.instance().onSenderSelected(mockEvent);
            expect(wrapper.state()).toEqual(expected);

        })
    })

    describe("onSenderSelected", () => {
        it("should call setState and set selectedReceiver and selectedReceiverID", () => {
            const mockEvent = {
                target: {
                    name: "selectedReceiverID",
                    value: "0_Test5_Test6"
                }
            };

            const defaultState = {
                senders: [],
                receivers: [],
                selectedSender: {},
                selectedSenderID: "",
                selectedReceiver: {},
                selectedReceiverID: ""

            };
            const expected = {
                senders: [],
                receivers: [],

                selectedSender:{},
                selectedSenderID: "",

                selectedReceiver: undefined,
                selectedReceiverID: "Test6"

            };

            expect(wrapper.state()).toEqual(defaultState)
            wrapper.instance().onReceiverSelected(mockEvent);
            expect(wrapper.state()).toEqual(expected);

        })
    })
})
