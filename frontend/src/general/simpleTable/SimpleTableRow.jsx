import React from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";

export default function SimpleTableRow(props) {
  const { name, value, centerValue } = props;

  let align = "left";
  if (centerValue) {
    align = "center";
  }

  return (
    <>
      <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell align={align}>{value}</TableCell>
      </TableRow>
    </>
  );
}

SimpleTableRow.defaultProps = {
  centerValue: false
};

SimpleTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  centerValue: PropTypes.bool
};
