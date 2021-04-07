import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import ButtonInfo from "./ButtonInfo";

export default function SmallCardButton(props) {
  const {
    button: { pathname, referenceObject, buttonText, onClick }
  } = props;

  if (onClick) {
    return (
      <Button variant="contained" size="small" onClick={onClick}>
        {buttonText}
      </Button>
    );
  }

  return (
    <NavLink
      activeClassName="hideLinkStyle"
      className="hideLinkStyle"
      to={{
        pathname,
        state: referenceObject
      }}
    >
      <Button variant="contained" size="small">
        {buttonText}
      </Button>
    </NavLink>
  );
}

SmallCardButton.propTypes = {
  button: PropTypes.instanceOf(ButtonInfo).isRequired
};
