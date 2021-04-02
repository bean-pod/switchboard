import React from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";

export default function SimpleTableRow(props) {
  const { name, value, alignment } = props;

  return (
    <>
      <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell align={alignment}>{value}</TableCell>
      </TableRow>
    </>
  );
}

SimpleTableRow.defaultProps = {
  alignment: "left"
};

SimpleTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  alignment: PropTypes.string
};
