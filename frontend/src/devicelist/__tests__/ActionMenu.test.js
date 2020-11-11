import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import ActionMenu from "../ActionMenu";

describe("<ActionMenu />", () => {
    let wrapper;
    let testElement;

    beforeEach(() => {
        wrapper = Enzyme.shallow(<ActionMenu />)
    });
    afterEach(() => {
        jest.clearAllMocks();
    })

    describe("Change State", () => {
        it("Should call setAnchorElement", () => {
            const mockEvent = {
                target: {
                    name: "anchorElement",
                    value: testElement
                }
            }
            const expected = {
                value: testElement
            }

            wrapper.instance().handleClick(mockEvent);
            expect(wrapper.state()).toEqual(expected);
        })
    })
})