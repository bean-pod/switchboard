import React from "react";
import PropTypes from "prop-types";
import { TableBody, Table, TableContainer } from "@material-ui/core";
import SimpleTableRow from "./SimpleTableRow";

import { zipProperties } from "./SimpleTableUtil";

export default function SimpleTable(props) {
  const { properties, alignment } = props;

  const propertiesArr = zipProperties(properties);

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {propertiesArr.map((propertyPair) => (
            <SimpleTableRow
              name={propertyPair[0]}
              value={propertyPair[1]}
              alignment={alignment}
              key={`component_${propertyPair[0]}`}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleTable.defaultProps = {
  alignment: "left"
};
SimpleTable.propTypes = {
  propertyNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  properties: PropTypes.arrayOf(PropTypes.node).isRequired,
  alignment: PropTypes.string
};
