import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashboardButton from "../general/dashboard/DashboardButton";

export default function DevicesCard() {
  return (
    <DashboardCard title="Devices">
      <Grid item xs={4}>
        <DashboardButton href="/Devices" selected={1}>
          View Senders
        </DashboardButton>
      </Grid>
      <Grid item xs={4}>
        <DashboardButton href="/Devices" selected={2}>
          View Receivers
        </DashboardButton>
      </Grid>
    </DashboardCard>
  );
}
