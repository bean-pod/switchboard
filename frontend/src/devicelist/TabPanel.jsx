import React from "react";
import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";

export default function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Paper>{children}</Paper>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};
