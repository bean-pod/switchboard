import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Container } from "@material-ui/core";

import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import DeviceDetailsTabTable from "./DeviceDetailsTabTable";
import DeviceInfo from "../model/DeviceInfo";
import { getSampleSender } from "../api/SampleData";
import DeleteDeviceButton from "./DeleteDeviceButton";

export default function DeviceDetailsPage(props) {
  const {
    location: {
      state: { device }
    }
  } = props;
  const tabs = ["Overview", "Activity Log", "Notes"];

  return (
    <Container>
      <DynamicBreadcrumb
        breadcrumbs={[
          ["Home", "/"],
          ["My Devices", "/Devices"],
          [device.name, device.id]
        ]}
      />
      <Box className="areaUnderBreadcrumbs">
        <Box className="flexContents headerAreaUnderline">
          <div className="title">{device.name}</div>
          <div className="alignRightFloat">
            <Box marginRight={2} marginTop={2}>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Box>
            <Box marginRight={2} marginTop={2}>
              <DeleteDeviceButton
                deviceType={device.deviceType}
                deleteId={device.id}
              />
            </Box>
          </div>
        </Box>
      </Box>
      <DeviceDetailsTabTable tabs={tabs} device={device} />
    </Container>
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
