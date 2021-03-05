import React from "react";
import PropTypes from "prop-types";

import Page from "../general/Page";
import DeviceDetailsPageContents from "./DeviceDetailsPageContents"
import DeviceInfo from "../model/DeviceInfo";
import { getSampleSender } from "../api/SampleData";

export default function DeviceDetailsPage(props) {
  const {
    location: {
      state: { device }
    }
  } = props;

  const breadcrumbs = [
    ["Home", "/Home"],
    ["My Devices", "/Devices"],
    ["Device Details", `/Devices/Details/${device.serialNumber}`]
  ];

  return (
    <Page title="Device Details" breadcrumbs={breadcrumbs}>
      <DeviceDetailsPageContents device={device} />
    </Page>
  );
}

DeviceDetailsPage.defaultProps = {
  location: { state: { device: getSampleSender() } }
};

DeviceDetailsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      device: PropTypes.instanceOf(DeviceInfo)
    })
  })
};
