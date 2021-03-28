import React from "react";
import PropTypes from "prop-types";
import { TableBody, Table, TableContainer } from "@material-ui/core";
import SimpleTableRow from "./SimpleTableRow";

export default function SimpleTable(props) {
  const { propertyPairs, centerValues } = props;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {propertyPairs.map((propertyPair) => (
            <SimpleTableRow
              name={propertyPair[0]}
              value={propertyPair[1]}
              centerValue={centerValues}
              key={`component_${propertyPair[0]}`}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleTable.defaultProps = {
  centerValues: false
}
SimpleTable.propTypes = {
  propertyPairs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node))
    .isRequired,
  centerValues: PropTypes.bool
};
