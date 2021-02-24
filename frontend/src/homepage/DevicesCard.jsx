import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";

export default function Devices() {
  return (
    <DashboardCard title="Devices">
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={4}>
          <DashBoardButton href="/Devices">View Senders</DashBoardButton>
        </Grid>
        <Grid item xs={4}>
          <DashBoardButton href="/Devices">View Receivers</DashBoardButton>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
