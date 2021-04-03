import React from "react";
import PropTypes from "prop-types";

import DeviceInfo from "../model/DeviceInfo";
import SelectDeviceDialog from "./SelectDeviceDialog/SelectDeviceDialog";
import CreateStreamCardToggler from "./cards/CreateStreamCardToggler";

export default class CreateStreamDeviceCardWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog() {
    this.dialogElement.current.openDialog();
  }

  render() {
    const {
      title,
      deviceList,
      deviceIndex,
      setDeviceIndex,
      channelIndex,
      setChannelIndex
    } = this.props;

    return (
      <>
        <CreateStreamCardToggler
          title={title}
          openDialog={this.openDialog}
          device={deviceList[deviceIndex]}
          channelIndex={channelIndex}
        />
        <SelectDeviceDialog
          ref={this.dialogElement}
          deviceList={deviceList}
          deviceIndex={deviceIndex}
          setDeviceIndex={setDeviceIndex}
          channelIndex={channelIndex}
          setChannelIndex={setChannelIndex}
        />
      </>
    );
  }
}

CreateStreamDeviceCardWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  deviceList: Proptypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired,
  deviceIndex: PropTypes.number.isRequired,
  setDeviceIndex: PropTypes.func.isRequired,
  channelIndex: PropTypes.number.isRequired,
  setChannelIndex: PropTypes.func.isRequired
};
