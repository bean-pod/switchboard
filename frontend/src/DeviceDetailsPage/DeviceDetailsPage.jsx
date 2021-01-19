import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Container, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import DeviceDetailsTabTable from "./DeviceDetailsTabTable";
import DeviceInfo from "../model/DeviceInfo";
import { getSampleSender } from "../api/SampleData";
import DeleteDeviceButton from "./DeleteDeviceButton";
import DeviceDetailsConciseTable from "./DeviceDetailsConciseTable";

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
          <Box className="flexContents">
            <div className="title">{device.name}</div>
            <Box padding={4} paddingLeft={1} paddingBottom={0}>
              <Button>
                <EditIcon color="action" />
              </Button>
            </Box>
          </Box>
          <div className="alignRightFloat">
            <Box marginRight={2} marginTop={2}>
              <DeleteDeviceButton
                deviceType={device.deviceType}
                deleteId={device.id}
              />
            </Box>
          </div>
        </Box>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={6} spacing={2}>
          <Box paddingLeft={3}>
            <DeviceDetailsConciseTable device={device} />
          </Box>
        </Grid>
        <Grid item xs={6} spacing={2}>
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
