import React from "react";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import { DialogTitle, MobileStepper } from "@material-ui/core";
import SelectDeviceTable from "../SelectDeviceDialog/SelectDeviceTable";
import SelectChannelTable from "../SelectDeviceDialog/SelectChannelTable";
import StreamDeviceCard from "../../general/StreamDeviceCard";

import StepperNextButton from "./StepperNextButton";
import DeviceInfo from "../../model/DeviceInfo";
import StepperBackButton from "./StepperBackButton";
import "./swipeable.css";

export default class SelectDeviceSwipeableSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    };

    this.steps = [`Select a Device`, `Select a Channel`, `Confirm Device`];
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.getNextButton = this.getNextButton.bind(this);
    this.getBackButton = this.getBackButton.bind(this);
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

  getNextButton() {
    const { handleClose } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.steps.length;

    return (
      <StepperNextButton
        disabled={this.disableNext()}
        isLast={activeStep === maxSteps - 1}
        handleClose={handleClose}
        handleNext={this.handleNext}
      />
    );
  }

  getBackButton() {
    const { handleClose } = this.props;
    const { activeStep } = this.state;

    return (
      <StepperBackButton
        isFirst={activeStep === 0}
        handleClose={handleClose}
        handleBack={this.handleBack}
      />
    );
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
        <DialogTitle>{this.steps[activeStep]}</DialogTitle>
        <SwipeableViews
          className="halfScreenVertically"
          axis="x"
          index={activeStep}
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
              deviceIndex={deviceIndex}
              deviceList={deviceList}
            />
          )}
          {deviceIndex === -1 || channelIndex === -1 ? (
            <></>
          ) : (
            <StreamDeviceCard
              title="Preview"
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
          nextButton={this.getNextButton()}
          backButton={this.getBackButton()}
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
