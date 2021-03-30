import React from "react";
import { Button, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { SwapHoriz } from "@material-ui/icons/";

export default function ActiveStreamButton(props) {
  const { type } = props;
  const StyledButton = withStyles({
    root: {
      background: "linear-gradient(45deg, #01b2fe 30%, #01b2fe 90%)",
      borderRadius: 90,
      border: 0,
      color: "white",
      height: 40,
      padding: "0px"
    },
    label: {
      textTransform: ""
    }
  })(Button);

  return (
    <StyledButton type={type}>
      <div className="buttonText">
        <SwapHoriz />
        Active Streams
      </div>
    </StyledButton>
  );
}

ActiveStreamButton.propTypes = {
  type: PropTypes.string.isRequired
};
