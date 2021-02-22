import React from "react";
import { Grid } from "@material-ui/core";
import DashboardCard from "./DashboardCard";
import DashBoardButton from "./DashboardButton";

export default function ActiveStreamsCard() {
  return (
    <DashboardCard title="Active Streams" style={{ height: "100%" }}>
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={12}>
          TABLE GOES HERE
        </Grid>
        <Grid item xs={4}>
          <DashBoardButton>See more</DashBoardButton>
        </Grid>
        <Grid item xs={4}>
          <DashBoardButton>Start Stream</DashBoardButton>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
