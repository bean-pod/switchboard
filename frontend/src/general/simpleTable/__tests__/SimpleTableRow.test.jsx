import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import { TableRow, TableCell } from "@material-ui/core";
import SimpleTableRow from "../SimpleTableRow";

Enzyme.configure({ adapter: new Adapter() });

describe("<SimpleTableRow/> functional component", () => {
  const dummyName = "number";
  const dummyValue = 1;

  const wrapper = Enzyme.shallow(
    <SimpleTableRow name={dummyName} value={dummyValue} />
  );
  it("has 1 TableRow component", () => {
    expect(wrapper.find(TableRow)).toHaveLength(1);
  });
  describe("when centerValue is not given or false", () => {
    it("has 2 TableCell components with expected contents and props", () => {
      const cells = wrapper.find(TableCell);
      expect(cells).toHaveLength(2);

      const firstCell = cells.at(0);
      expect(firstCell.text()).toBe("number");
      const secondCell = cells.at(1);
      expect(secondCell.text()).toBe("1");
      expect(secondCell.props().align).toBe("left");
    });
  });
  describe("when centerValue is true", () => {
    const centerValue = Enzyme.shallow(
      <SimpleTableRow name={dummyName} value={dummyValue} centerValue />
    );

    it("has 2 TableCell components with expected contents and props", () => {
      const cells = centerValue.find(TableCell);
      expect(cells).toHaveLength(2);

      const firstCell = cells.at(0);
      expect(firstCell.text()).toBe("number");
      const secondCell = cells.at(1);
      expect(secondCell.text()).toBe("1");
      expect(secondCell.props().align).toBe("center");
    });
  });
});
