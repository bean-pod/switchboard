import React from "react";
import { Button, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { SwapHoriz } from "@material-ui/icons/";

export default function StreamButton(props) {
  const { id, type } = props;
  const StyledButton = withStyles({
    root: {
      background: "linear-gradient(45deg, #59bc31 30%, #59bc31 90%)",
      borderRadius: 90,
      border: 0,
      color: "white",
      height: 40,
      padding: "0 5px",
      margin: "1em"
    },
    label: {
      textTransform: ""
    }
  })(Button);

  return (
    <StyledButton id={id} type={type}>
      <div className="buttonText">
        <SwapHoriz />
        Stream
      </div>
    </StyledButton>
  );
}

StreamButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
