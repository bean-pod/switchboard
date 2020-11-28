import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Grid } from "@material-ui/core";

import DeviceDetailsConciseTable from "./DeviceDetailsConciseTable";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import DeviceDetailsTabTable from "./DeviceDetailsTabTable";
import DeviceInfo from "../model/DeviceInfo";

export default class DeviceDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.tabs = ["Overview", "Activity Log", "Notes"];
  }

  render() {
    const { device } = this.props;
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
          <Grid item xs={12} className="flexContents headerArea">
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
              <Button variant="outlined" color="red">
                Delete
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={6}>
            <DeviceDetailsTabTable tabs={this.tabs} device={device} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

DeviceDetailsPage.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
