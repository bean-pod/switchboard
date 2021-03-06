import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Container } from "@material-ui/core";

import DeviceInfo from "../model/DeviceInfo";
import DeviceInfoCard from "./cards/DeviceInfoCard";
import DeviceLogCard from "./cards/DeviceLogCard";
import DeviceChannelCard from "./cards/DeviceChannelCard";

import { getSampleSender } from "../api/SampleData";
import GridColumn from "../general/dashboard/GridColumn";
import DeleteDeviceDialogOpener from "./DeleteDeviceDialog/DeleteDeviceDialogOpener";
import DeviceConfigActionsCard from "./cards/DeviceConfigActionsCard";

export default function DeviceDetailsPageContents(props) {
  const { device } = props;

  return (
    <Container>
      <Grid container spacing={3}>
        <GridColumn width={6}>
          <Grid item xs={12}>
            <DeviceInfoCard device={device} />
          </Grid>
          <Grid item xs={12}>
            <DeviceChannelCard device={device} />
          </Grid>
          <Grid item xs={12}>
            <DeviceConfigActionsCard device={device} />
          </Grid>
        </GridColumn>
        <Grid item xs={6}>
          <DeviceLogCard device={device} />
        </Grid>
      </Grid>
      <Box className="alignRightFloatPadded">
        <DeleteDeviceDialogOpener device={device} />
      </Box>
    </Container>
  );
}
DeviceDetailsPageContents.defaultProps = {
  device: getSampleSender()
};

DeviceDetailsPageContents.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo)
};
