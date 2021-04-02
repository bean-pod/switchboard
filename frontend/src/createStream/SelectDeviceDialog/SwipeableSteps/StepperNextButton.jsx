import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

export default function StepperNextButton(props) {
  const { isLast, handleNext, handleClose } = props;

  const buttonText = isLast ? "Confirm" : "Next";

  const handleClick = isLast ? handleClose : handleNext;

  return (
    <Button size="small" onClick={handleClick}>
      {buttonText}
    </Button>
  );
}

StepperNextButton.propTypes = {
  isLast: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};
