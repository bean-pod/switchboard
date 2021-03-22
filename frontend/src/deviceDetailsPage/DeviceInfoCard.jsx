import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DeviceDetailsInfoTable from "./DeviceDetailsInfoTable";

export default function DeviceInfoCard(props) {
  const { device } = props;

  return (
    <DashboardCard title="Device Info">
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={12}>
          <DeviceDetailsInfoTable device={device}/>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
