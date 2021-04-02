import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

import SwipeableViews from "react-swipeable-views";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { Button, DialogTitle, MobileStepper, Typography } from "@material-ui/core";
import StepperNextButton from "./StepperNextButton";

export default class SelectDeviceSwipeableSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    };
    this.steps = [
      {
        label: "Select a Device"
      },
      {
        label: "Select a Channel"
      },
      {
        label: `Confirm Device`
      }
    ];
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
  }

  handleNext() {
    const { activeStep: previousStep } = this.state;
    this.setState({
      activeStep: previousStep + 1
    });
  }

  handleBack() {
    const { activeStep: previousStep } = this.state;
    this.setState({
      activeStep: previousStep - 1
    });
  }

  handleStepChange(step) {
    this.setState({
      activeStep: step
    });
  }

  render() {
    const { device, handleClose } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.steps.length;

    return (
      <>
        <DialogTitle>{this.steps[activeStep].label}</DialogTitle>
        <SwipeableViews
          axis="x"
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {this.steps.map((step, index) => {
            return (
              <div key={step.label}>
                Hello
                {index}
              </div>
            );
          })}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={(
            <StepperNextButton
              isLast={activeStep === maxSteps - 1}
              handleClose={handleClose}
              handleNext={this.handleNext}
            />
          )}
          backButton={(
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          )}
        />
      </>
    );
  }
}

SelectDeviceSwipeableSteps.propTypes = {
  handleClose: PropTypes.func.isRequired
};
