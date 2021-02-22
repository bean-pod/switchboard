import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

export default function DashboardButton(props) {
  const { children } = props;
  return (
    <Button variant="contained" color="primary">
      {children}
    </Button>
  );
}

DashboardButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
