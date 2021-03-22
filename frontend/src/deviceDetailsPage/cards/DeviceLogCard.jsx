import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DeviceInfo from "../../model/DeviceInfo";
import DashboardCard from "../../general/dashboard/DashboardCard";
import DeviceLogTableWrapper from "../DeviceLogTableWrapper";

export default function DeviceLogCard(props) {
  const { device } = props;

  return (
    <DashboardCard title="Logs">
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={12}>
          <DeviceLogTableWrapper device={device} />
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

DeviceLogCard.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
