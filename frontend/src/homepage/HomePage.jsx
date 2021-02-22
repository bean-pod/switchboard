import React from "react";
import ReactDOM from "react-dom";
import "./homepage.css";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import DashboardCard from "./DashboardCard";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";

export default function HomePage() {
  return (
    <Container>
      <DynamicBreadcrumb breadcrumbs={[["Home", ""]]} />

      <Box className="flexContents headerAreaUnderline">
        <div className="title">Dashboard</div>
      </Box>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={6}>
          <Grid style={{ height: "100%" }}>
            <DashboardCard style={{ height: "100%"}}>
              <Typography variant="h4" gutterBottom>
                Active Streams
              </Typography>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12}>
                  TABLE GOES HERE
                </Grid>
                <Grid container alignItems = "flex-end" alignContent="center" >
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" >See more</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary">Start Stream</Button>
                </Grid>                  
                </Grid>
              </Grid>
            </DashboardCard>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <DashboardCard>My Devices</DashboardCard>
        </Grid>
        <Grid item xs={6}>
        <DashboardCard>Activity Log</DashboardCard>
        </Grid>
        <Grid item xs={6}>
        <DashboardCard>Admin Panel</DashboardCard>
        </Grid>
      </Grid>
    </Container>
  );
}
