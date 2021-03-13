import { afterEach, beforeEach, expect, jest } from "@jest/globals";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateUserFailedDialog from "../createUser/CreateUserFailedDialog";

Enzyme.configure({ adapter: new Adapter() });

const setOpen = jest.fn();
const message = "This is the dialog box message";

describe("CreateUserFailedDialog", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(
      <CreateUserFailedDialog open setOpen={setOpen} message={message} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should contain the message and close when the OK button is pressed", () => {
    const title = wrapper.find("div h2");
    expect(title.text()).toEqual("Failed to create a user");

    const dialogMessage = wrapper.find("p");
    expect(dialogMessage.text()).toEqual(message);

    const okButton = wrapper.find("button");
    okButton.simulate("click");

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
