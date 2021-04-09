import React from "react";
import PropTypes from "prop-types";

import DeviceInfo from "../model/DeviceInfo";
import DetailsButton from "../general/Buttons/DetailsButton";

export default function DeviceDetailsButton(props) {
  const { deviceInfo } = props;

  const navLinkInfo = {
    pathname: `/Devices/Details/${deviceInfo.serialNumber}`,
    state: { object: deviceInfo }
  };

  return (
    <>
      <DetailsButton
        navLinkInfo={navLinkInfo}
        tooltipTitle="View Device Details"
      />
    </>
  );
}

DeviceDetailsButton.propTypes = {
  deviceInfo: PropTypes.instanceOf(DeviceInfo).isRequired
};
