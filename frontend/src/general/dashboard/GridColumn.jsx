import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

export default function GridColumn(props) {
  const { width, spacing, children } = props;
  return (
    <Grid item xs={width}>
      <Grid container spacing={spacing}>
        {children}
      </Grid>
    </Grid>
  );
}

GridColumn.propTypes = {
  width: PropTypes.number.isRequired,
  spacing: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

GridColumn.defaultProps = {
  spacing: 3
};
