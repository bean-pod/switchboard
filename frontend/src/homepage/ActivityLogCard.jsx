import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";
import LogsTableWrapper from "../loglist/LogsTableWrapper";

import * as LogApi from "../api/LogApi";

export default function ActivityLogsCard() {
  const dataSource = LogApi;

  return (
    <DashboardCard title="Activity Logs">
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={12}>
          <LogsTableWrapper logsDataSource={dataSource} />
        </Grid>
        <Grid item xs={4}>
          <DashBoardButton href="/Logs">View All</DashBoardButton>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
