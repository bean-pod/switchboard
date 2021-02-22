import React from "react";
import "./homepage.css";
import { Box, Container, Grid } from "@material-ui/core";
import DashboardCard from "./DashboardCard";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import ActiveStreamsCard from "./ActiveStreamsCard";

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
          <DashboardCard title="My Devices" />
        </Grid>
        <Grid item xs={6}>
          <DashboardCard title="Activiy Logs" />
        </Grid>
        <Grid item xs={6}>
          <DashboardCard title="Admin Panel" />
        </Grid>
      </Grid>
    </Container>
  );
}
