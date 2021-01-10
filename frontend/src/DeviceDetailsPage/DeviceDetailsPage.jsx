import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Grid } from "@material-ui/core";

import DeviceDetailsConciseTable from "./DeviceDetailsConciseTable";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import DeviceDetailsTabTable from "./DeviceDetailsTabTable";
import DeviceInfo from "../model/DeviceInfo";
import { getSampleSender } from "../api/SampleData";

export default function DeviceDetailsPage(props) {
  const {
    location: {
      state: { device }
    }
  } = props;
  const tabs = ["Overview", "Activity Log", "Notes"];

  return (
    <Container>
      <DynamicBreadcrumb
        breadcrumbs={[
          ["Home", "/"],
          ["My Devices", "/Devices"],
          [device.name, device.id]
        ]}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} className="flexContents headerAreaUnderline">
          <div className="title">{device.name}</div>
        </Grid>
        <Grid item xs={12} />
        <Grid container xs={5} spacing={2}>
          <Grid item xs={12}>
            <DeviceDetailsConciseTable device={device} />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined">Delete</Button>
          </Grid>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={6}>
          <DeviceDetailsTabTable tabs={tabs} device={device} />
        </Grid>
      </Grid>
    </Container>
  );
}
DeviceDetailsPage.defaultProps = {
  location: { state: { device: getSampleSender() } }
};

DeviceDetailsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      device: PropTypes.instanceOf(DeviceInfo)
    })
  })
};
