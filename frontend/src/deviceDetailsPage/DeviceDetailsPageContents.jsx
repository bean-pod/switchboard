import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DeviceInfo from "../model/DeviceInfo";
import DeviceInfoCard from "./cards/DeviceInfoCard";
import DeviceLogCard from "./cards/DeviceLogCard";
import DeviceChannelCard from "./cards/DeviceChannelCard";

import { getSampleSender } from "../api/SampleData";
import GridColumn from "../general/dashboard/GridColumn";

export default function DeviceDetailsPageContents(props) {
  const { device } = props;

  return (
    <Grid container spacing={3}>
      <GridColumn width={6}>
        <Grid item xs={12}>
          <DeviceInfoCard device={device} />
        </Grid>
        <Grid item xs={12}>
          <DeviceChannelCard device={device} />
        </Grid>
      </GridColumn>
      <Grid item xs={6}>
        <DeviceLogCard device={device} />
      </Grid>
    </Grid>
  );
}
DeviceDetailsPageContents.defaultProps = {
  device: getSampleSender()
};

DeviceDetailsPageContents.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo)
};
