import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

export default function StepperNextButton(props) {
  const { disabled, isLast, handleNext, handleClose } = props;

  const buttonText = isLast ? "Confirm" : "Next";

  const handleClick = isLast ? handleClose : handleNext;

  return (
    <Button size="small" onClick={handleClick} disabled={disabled}>
      {buttonText}
    </Button>
  );
}

StepperNextButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};
