import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, afterEach, describe, expect, it } from "@jest/globals";

import { TableContainer, TableBody, Table } from "@material-ui/core";
import SimpleTable from "../SimpleTable";
import SimpleTableRow from "../SimpleTableRow";
import * as SimpleTableUtil from "../SimpleTableUtil";

Enzyme.configure({ adapter: new Adapter() });

describe("<SimpleTable/> functional component", () => {
  let wrapper;
  const dummyNames = ["name"];
  const dummyValues = [1];

  beforeEach(() => {
    jest.spyOn(SimpleTableUtil, "zipProperties").mockImplementation(() => {
      return [[dummyNames[0], dummyValues[0]]];
    });

    wrapper = Enzyme.shallow(
      <SimpleTable propertyNames={dummyNames} properties={dummyValues} />
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("calls zipProperties function", () => {
    expect(SimpleTableUtil.zipProperties).toHaveBeenCalledWith(
      dummyNames,
      dummyValues
    );
  });
  it("has 1 component each for TableContainer, Table, and TableBody", () => {
    expect(wrapper.find(TableContainer)).toHaveLength(1);
    expect(wrapper.find(Table)).toHaveLength(1);
    expect(wrapper.find(TableBody)).toHaveLength(1);
  });

  describe("when centerValues is not given or false", () => {
    it("has 1 SimpleTableRow component with expected props", () => {
      const row = wrapper.find(SimpleTableRow);
      expect(row).toHaveLength(1);

      const rowProps = row.props();
      expect(rowProps.name).toBe("name");
      expect(rowProps.value).toBe(1);
      expect(rowProps.centerValue).toBe(false);
    });
  });
  describe("when centerValues is true", () => {
    const centeredVals = Enzyme.shallow(
      <SimpleTable
        propertyNames={dummyNames}
        properties={dummyValues}
        centerValues
      />
    );
    it("has 1 SimpleTableRow component with expected props", () => {
      const row = centeredVals.find(SimpleTableRow);
      expect(row).toHaveLength(1);

      const rowProps = row.props();
      expect(rowProps.name).toBe("name");
      expect(rowProps.value).toBe(1);
      expect(rowProps.centerValue).toBe(true);
    });
  });
});