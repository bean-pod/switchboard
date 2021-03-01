import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";

import GridColumn from "../general/dashboard/GridColumn";
import DashboardCard from "../general/dashboard/DashboardCard";
import ActiveStreamCard from "./ActiveStreamCard";
import ActivityLogCard from "./ActivityLogCard";
import DevicesCard from "./DevicesCard";
import AdminPanelCard from "./AdminPanelCard";

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
        direction="row"
        spacing={3}
      >
        <Grid item xs={6}>
          <Grid style={{ height: "100%" }}>
            <ActiveStreamCard />
          </Grid>
        </Grid>
        <GridColumn width={6}>
          <Grid item xs={12}>
            <DevicesCard />
          </Grid>
          <Grid item xs={12}>
            <ActivityLogCard />
          </Grid>
          <Grid item xs={12}>
            <AdminPanelCard/>
          </Grid>
        </GridColumn>
      </Grid>
    </Container>
  );
}
