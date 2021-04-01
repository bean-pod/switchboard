import React from "react";
import PropTypes from "prop-types";
import { TableBody, Table, TableContainer } from "@material-ui/core";
import SimpleTableRow from "./SimpleTableRow";

import { zipProperties } from "./SimpleTableUtil";

export default function SimpleTable(props) {
  const { propertyNames, properties, alignment } = props;

  const propertyPairs = zipProperties(propertyNames, properties);

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {propertyPairs.map((propertyPair) => (
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
