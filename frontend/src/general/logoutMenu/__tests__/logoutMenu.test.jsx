import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import {
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography
  } from "@material-ui/core";
  import { NavLink } from "react-router-dom";
import LogoutMenu from "../LogoutMenu";

Enzyme.configure({ adapter: new Adapter() });

describe("<LogoutMenu/> functional component", ()=>{
    let wrapper;
    const dummyanchor = {thing :"thing"};
    const dummyOpen = true;
    let mockHandleClose;
    let mockHandleLogout;
    
    describe("returns a component that", ()=>{
        beforeEach(()=>{
            mockHandleClose = jest.fn();
            mockHandleLogout = jest.fn();
            wrapper = Enzyme.shallow(<LogoutMenu anchor={dummyanchor} open={dummyOpen} handleClose={mockHandleClose} handleLogou={mockHandleLogout}  />)
        })
        it("Contains one <Popper/> component with expected props", ()=>{
            const components= wrapper.find(Popper);
            expect(components).toHaveLength(1);
      
            const props = components.at(0).props();
            const expected = {
              open: dummyOpen,
              anchorEl: dummyAnchor,
              transition: true,
              disablePortal: true
            }
            expect(props).toStrictEqual(expected);
        })
        it("Contains one <Grow/> component with expected props", ()=>{
            const components= wrapper.find(Grow);
            expect(components).toHaveLength(1);
      
            const props = components.at(0).props();
            const expected = {
                in: dummyOpen,
                style: { transformOrigin: "center top" }
            }
            expect(props).toStrictEqual(expected);
        })
        it("Contains one <Paper/> component with expected props", ()=>{
            const components= wrapper.find(Paper);
            expect(components).toHaveLength(1);
      
            const props = components.at(0).props();
            expect(props).toHaveLength(0);
        })
        it("Contains one <ClickAwayListener/> component with expected props", ()=>{
            const components= wrapper.find(ClickAwayListener);
            expect(components).toHaveLength(1);
      
            const props = components.at(0).props();
            const expected = {
                onClickAway: mockHandleClose
            }
            expect(props).toStrictEqual(expected);
        })
        it("Contains one <MenuList/> component with expected props", ()=>{
            const components= wrapper.find(MenuList);
            expect(components).toHaveLength(1);
      
            const props = components.at(0).props();
            const expected = {
                autoFocusItem: dummyOpen,
                idL: "menu-list-grow"
            }
            expect(props).toStrictEqual(expected);
        })
        it("Contains 4 <MenuItem/> components with expected props", ()=>{
            const components= wrapper.find(MenuItem);
            expect(components).toHaveLength(4);
        })
        it("<MenuItem/> 0 has expected props", ()=>{
            const components= wrapper.find(MenuItem);      
            const props = components.at(0).props();

            const expected = {
                disabled: true
            }
            expect(props).toMatchObject(expected);
        })
        it("<MenuItem/> 1 has expected props", ()=>{
            const components= wrapper.find(MenuItem);      
            const props = components.at(1).props();

            expect(props).toHaveLength(0);
        })
        it("<MenuItem/> 2 has expected props", ()=>{
            const components= wrapper.find(MenuItem);      
            const props = components.at(2).props();

            expect(props).toHaveLength(0);
        })
        it("<MenuItem/> 3 has expected props", ()=>{
            const components= wrapper.find(MenuItem);      
            const props = components.at(3).props();

            const expected = {
                onClick: mockHandleLogout
            }
            expect(props).toMatchObject(expected);
        })
    })
})