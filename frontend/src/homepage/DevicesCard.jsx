import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";

export default function DevicesCard() {
  return (
    <DashboardCard title="Devices">
      <Grid item xs={4}>
        <DashBoardButton href="/Devices" selected={1}>
          View Senders
        </DashBoardButton>
      </Grid>
      <Grid item xs={4}>
        <DashBoardButton href="/Devices" selected={2}>
          View Receivers
        </DashBoardButton>
      </Grid>
    </DashboardCard>
  );
}
