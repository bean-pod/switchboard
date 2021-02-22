import React from "react";
import PropTypes from "prop-types";
import "./homepage.css";
import { Button, withStyles } from "@material-ui/core";

export default function DashboardButton(props) {
  const { children } = props;

  const StyledButton = withStyles({
    root: {
      background: "linear-gradient(45deg, #59bc31 30%, #59bc31 90%)",
      borderRadius: 90,
      border: 0,
      color: "white",
      height: 40,
      minWidth: 100,
      maxWidth: 200,
      padding: "0 5px",
      textTransform: "none"
    }
  })(Button);
  return <StyledButton>{children}</StyledButton>;
}

DashboardButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
