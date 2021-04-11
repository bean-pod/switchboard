import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";

export default function AdminPanelCard() {
  return (
    <DashboardCard title="Admin Panel">
      <Grid item xs={4}>
        <DashBoardButton href="/Admin/New">Create a User</DashBoardButton>
      </Grid>
    </DashboardCard>
  );
}
