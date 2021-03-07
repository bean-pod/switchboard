import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { AccountCircle, Home } from "@material-ui/icons/";
import { NavLink } from "react-router-dom";
import HeaderBar from "../general/HeaderBar";

Enzyme.configure({ adapter: new Adapter() });
describe("<HeaderBar/> functional Component", () => {
  const wrapper = Enzyme.shallow(<HeaderBar />);
  it("returns a component with the correct elements", () => {
    expect(wrapper.find(".headerBar")).toHaveLength(1);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(Toolbar)).toHaveLength(1);

    expect(wrapper.find(NavLink)).toHaveLength(1);
    const firstNavLink = wrapper.find(NavLink).at(0);
    expect(firstNavLink.props().to).toBe("/");

    expect(wrapper.find(".headerTitle")).toHaveLength(2);
    expect(wrapper.find(".headerTitle").first().text()).toBe("Switchboard");

    expect(wrapper.find(IconButton)).toHaveLength(2);

    const firstButton = wrapper.find(IconButton).at(0);
    expect(firstButton.props().edge).toBe("start");
    expect(firstButton.props().color).toBe("inherit");
    expect(firstButton.props()["aria-label"]).toBe("menu");

    const secondButton = wrapper.find(IconButton).at(1);
    expect(secondButton.props().id).toBe("acctBtn");
    expect(secondButton.props().color).toBe("inherit");

    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(AccountCircle)).toHaveLength(1);
  });
});
