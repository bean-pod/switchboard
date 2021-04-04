import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DeviceInfo from "../model/DeviceInfo";
import DashboardCard from "./dashboard/DashboardCard";
import SimpleTable from "./simpleTable/SimpleTable";
import ButtonInfo from "./dashboard/ButtonInfo";

export default function StreamDeviceCard(props) {
  const { title, button, device, channel } = props;
  const properties = {
    Name: device.name,
    "Serial Number": device.serialNumber,
    Channel: channel
  };

  return (
    <DashboardCard title={title} button={button}>
      <Grid container>
        <Grid item xs={12}>
          <SimpleTable properties={properties} />
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

StreamDeviceCard.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.instanceOf(ButtonInfo).isRequired,
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  channel: PropTypes.number.isRequired
};
