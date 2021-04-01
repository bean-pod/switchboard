import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, afterEach, describe, expect, it } from "@jest/globals";

import { TableContainer, TableBody, Table } from "@material-ui/core";
import SimpleTable from "../SimpleTable";
import SimpleTableRow from "../SimpleTableRow";

Enzyme.configure({ adapter: new Adapter() });

describe("<SimpleTable/> functional component", () => {
  let wrapper;
  const dummyProperties = { name: 1 };

  beforeEach(() => {
    wrapper = Enzyme.shallow(<SimpleTable properties={dummyProperties} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("has 1 component each for TableContainer, Table, and TableBody", () => {
    expect(wrapper.find(TableContainer)).toHaveLength(1);
    expect(wrapper.find(Table)).toHaveLength(1);
    expect(wrapper.find(TableBody)).toHaveLength(1);
  });

  describe("when alignment is not given or left", () => {
    it("has 1 SimpleTableRow component with expected props", () => {
      const row = wrapper.find(SimpleTableRow);
      expect(row).toHaveLength(1);

      const rowProps = row.props();
      expect(rowProps.name).toBe("name");
      expect(rowProps.value).toBe(1);
      expect(rowProps.alignment).toBe("left");
    });
  });
  describe("when alignment is center", () => {
    const centeredVals = Enzyme.shallow(
      <SimpleTable properties={dummyProperties} alignment="center" />
    );
    it("has 1 SimpleTableRow component with expected props", () => {
      const row = centeredVals.find(SimpleTableRow);
      expect(row).toHaveLength(1);

      const rowProps = row.props();
      expect(rowProps.name).toBe("name");
      expect(rowProps.value).toBe(1);
      expect(rowProps.alignment).toBe("center");
    });
  });
});
