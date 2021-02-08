import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Container, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import DeviceDetailsTabTable from "./DeviceDetailsTabTable";
import DeviceInfo from "../model/DeviceInfo";
import { getSampleSender } from "../api/SampleData";
import DeleteDeviceButton from "../general/DeleteDeviceButton";
import DeviceNameDetail from "./DeviceNameDetail";

export default function DeviceDetailsPage(props) {
  const {
    location: {
      state: { device }
    }
  } = props;
  const tabs = ["Activity Log", "Notes"];

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
          <DeviceNameDetail deviceName={device.name} />
          <div className="alignRightFloat">
            <Box marginRight={2} marginTop={2}>
              <DeleteDeviceButton button deleteId={device.serialNumber} />
            </Box>
          </div>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={6}>
          <DeviceDetailsTabTable tabs={["Overview"]} device={device} />
        </Grid>
        <Grid item xs={6}>
          <DeviceDetailsTabTable tabs={tabs} device={device} />
        </Grid>
      </Grid>
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
