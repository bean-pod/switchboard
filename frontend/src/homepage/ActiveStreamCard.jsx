import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashboardButton from "../general/dashboard/DashboardButton";
import SimpleStreamTableWrapper from "../streamlist/SimpleStreamTableWrapper";

export default function ActiveStreamCard() {
  return (
    <DashboardCard title="Active Streams" style={{ height: "100%" }}>
      <Grid item xs={12}>
        <SimpleStreamTableWrapper />
      </Grid>
      <Grid item xs={4}>
        <DashboardButton href="/Streams">See More</DashboardButton>
      </Grid>
      <Grid item xs={4}>
        <DashboardButton href="/Streams/New">Start Stream</DashboardButton>
      </Grid>
    </DashboardCard>
  );
}
