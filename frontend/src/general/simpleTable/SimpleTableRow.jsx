import React from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";

export default function SimpleTableRow(props) {
  const { name, value } = props;

  return (
    <>
      <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell align="center">{value}</TableCell>
      </TableRow>
    </>
  );
}

SimpleTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired
};
