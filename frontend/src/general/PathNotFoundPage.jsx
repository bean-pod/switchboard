import { Grid } from "@material-ui/core";
import React from "react";
import DashboardButton from "./dashboard/DashboardButton";
import DashboardCard from "./dashboard/DashboardCard";
import Page from "./Page";

export default function PathNotFoundPage(props) {
  const { authenticated, handleLogout } = props;
  return (
    <Page
      authenticated={authenticated}
      handleLogout={handleLogout}
      title="Error 404: Path not found"
      breadcrumbs={[]}
    >
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={4}>
          <DashboardCard title="Sorry, that page doesn't exist!">
            <DashboardButton href="/Home">Go Home</DashboardButton>
          </DashboardCard>
        </Grid>
      </Grid>
    </Page>
  );
}
