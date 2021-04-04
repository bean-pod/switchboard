import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { Close, KeyboardArrowLeft } from "@material-ui/icons";

export default function StepperBackButton(props) {
  const { isFirst, handleBack, handleClose } = props;

  let handleClick = handleBack;
  let icon = <KeyboardArrowLeft />;
  let buttonText = "Back";

  if (isFirst){
    handleClick = handleClose;
    buttonText = "Cancel" ;
    icon = <Close/>;
  }

  return (
    <Button size="small" onClick={handleClick}>
      {icon}
      {buttonText}
    </Button>
  );
}

StepperBackButton.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};
