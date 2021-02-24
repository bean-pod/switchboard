import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import DashboardCard from "../general/dashboard/DashboardCard";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import ActiveStreamsCard from "./ActiveStreamsCard";
import ActivityLogsCard from "./ActivityLogsCard";
import DevicesCard from "./DevicesCard";

export default function HomePage() {
  return (
    <Container>
      <DynamicBreadcrumb breadcrumbs={[["Home", ""]]} />

      <Box className="flexContents headerAreaUnderline">
        <div className="title">Dashboard</div>
      </Box>
      <Grid
        container
        justify="center"
        alignItems="stretch"
        spacing={3}
        direction="row"
      >
        <Grid item xs={6}>
          <Grid style={{ height: "100%" }}>
            <ActiveStreamsCard />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <DevicesCard />
        </Grid>
        <Grid item xs={6}>
          <ActivityLogsCard />
        </Grid>
        <Grid item xs={6}>
          <DashboardCard title="Admin Panel" />
        </Grid>
      </Grid>
    </Container>
  );
}
