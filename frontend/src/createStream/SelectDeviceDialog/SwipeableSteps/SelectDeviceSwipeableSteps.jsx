import React from "react";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import { DialogTitle, MobileStepper } from "@material-ui/core";
import SelectDeviceTable from "../SelectDeviceTable";
import SelectChannelTable from "../SelectChannelTable";
import StreamDeviceCard from "../../../general/StreamDeviceCard";

import StepperNextButton from "./StepperNextButton";
import DeviceInfo from "../../../model/DeviceInfo";
import StepperBackButton from "./StepperBackButton";

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

  disableNext() {
    const { activeStep } = this.state;
    const { deviceIndex, channelIndex } = this.props;
    switch (activeStep) {
      case 0:
        return deviceIndex === -1;
      case 1:
        return channelIndex === -1;
      default:
        return false;
    }
  }

  render() {
    const {
      handleClose,
      deviceList,
      deviceIndex,
      setDeviceIndex,
      channelIndex,
      setChannelIndex
    } = this.props;
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
          <SelectDeviceTable
            selectedIndex={deviceIndex}
            setIndex={setDeviceIndex}
            deviceList={deviceList}
          />
          {deviceIndex === -1 ? (
            <></>
          ) : (
            <SelectChannelTable
              selectedIndex={channelIndex}
              setIndex={setChannelIndex}
              deviceList={deviceList}
              deviceIndex={deviceIndex}
            />
          )}
          {deviceIndex === -1 || channelIndex === -1 ? (
            <></>
          ) : (
            <StreamDeviceCard
              title="Preview"
              button={null}
              device={deviceList[deviceIndex]}
              channel={deviceList[deviceIndex].channels[channelIndex].port}
            />
          )}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={(
            <StepperNextButton
              disabled={this.disableNext()}
              isLast={activeStep === maxSteps - 1}
              handleClose={handleClose}
              handleNext={this.handleNext}
            />
          )}
          backButton={(
            <StepperBackButton
              isFirst={activeStep === 0}
              handleClose={handleClose}
              handleBack={this.handleBack}
            />
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
