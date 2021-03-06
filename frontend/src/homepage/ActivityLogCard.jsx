import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";

export default function ActivityLogCard() {
  return (
    <DashboardCard title="Activity Logs">
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={4}>
          <DashBoardButton href="/Logs">View All</DashBoardButton>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
