import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";

export default function AdminPanelCard() {
  return (
    <DashboardCard title="Admin Panel">
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={4}>
          <DashBoardButton href="/Admin">View Users</DashBoardButton>
        </Grid>
        <Grid item xs={4}>
          <DashBoardButton href="/Admin/CreateUser">
            Create a User
          </DashBoardButton>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
