import React from "react";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { Button, DialogTitle, MobileStepper } from "@material-ui/core";
import SelectDeviceTable from "../SelectDeviceTable";
import SelectChannelTable from "../SelectChannelTable";
import StreamDeviceCard from "../../../general/StreamDeviceCard";

import StepperNextButton from "./StepperNextButton";
import DeviceInfo from "../../../model/DeviceInfo";

export default class SelectDeviceSwipeableSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    };
    const {
      deviceList,
      deviceIndex,
      setDeviceIndex,
      channelIndex,
      setChannelIndex
    } = this.props;

    this.steps = [
      {
        label: "Select a Device",
        component: (
          <SelectDeviceTable
            selectedIndex={deviceIndex}
            setIndex={setDeviceIndex}
            deviceList={deviceList}
          />
        )
      },
      {
        label: "Select a Channel",
        component: (
          <SelectChannelTable
            selectedIndex={channelIndex}
            setIndex={setChannelIndex}
            device={deviceList[deviceIndex]}
          />
        )
      },
      {
        label: `Confirm Device`,
        component: (
          <StreamDeviceCard
            cardTitle="Device"
            button={null}
            device={deviceList[deviceIndex]}
            channel={deviceList[deviceIndex].channels[channelIndex]}
          />
        )
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
    const { handleClose } = this.props;
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
  handleClose: PropTypes.func.isRequired,
  deviceList: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired,
  deviceIndex: PropTypes.number.isRequired,
  setDeviceIndex: PropTypes.func.isRequired,
  channelIndex: PropTypes.number.isRequired,
  setChannelIndex: PropTypes.func.isRequired
};
