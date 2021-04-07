import React from "react";
import PropTypes from "prop-types";
import { TableBody, Table, TableContainer } from "@material-ui/core";
import SimpleTableRow from "./SimpleTableRow";

export default function SimpleTable(props) {
  const { properties, alignment } = props;

  const propertiesArr = Object.keys(properties).map((propertyName) => {
    return [propertyName, properties[propertyName]];
  });

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
  properties: PropTypes.objectOf(PropTypes.node).isRequired,
  alignment: PropTypes.string
};
