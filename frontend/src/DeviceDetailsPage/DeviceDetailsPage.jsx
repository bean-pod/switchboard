import React from "react";
import { Box, Container, Grid } from "@material-ui/core";

import DeviceDetailsConciseTable from "./DeviceDetailsConciseTable";
import DynamicBreadcrumb from "../General/DynamicBreadcrumb";
import DeviceDetailsTabTable from "./DeviceDetailsTabTable";

export default class DeviceDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.tabs = ["Overview", "Activity Log", "Notes"];
  }

  render() {
    return (
      <Container>
        <DynamicBreadcrumb
          breadcrumbs={[
            ["Home", ""],
            ["My Devices", "Devices"],
            [this.props.device.name, this.props.device.id]
          ]}
        />
        <Grid container spacing={1}>
          <Grid item xs={12} className="flexContents headerArea">
            <div className="title">{this.props.device.name}</div>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={5}>
            <DeviceDetailsConciseTable device={this.props.device} />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={6}>
            <DeviceDetailsTabTable
              tabs={this.tabs}
              device={this.props.device}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
