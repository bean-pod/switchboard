import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DeviceInfo from "../model/DeviceInfo";
import DashboardCard from "../general/dashboard/DashboardCard";
import SimpleTable from "../general/simpleTable/SimpleTable";
import ButtonInfo from "../general/dashboard/ButtonInfo";

export default function StreamDetailsDeviceCard(props) {
  const { cardTitle, device, channel } = props;
  const button = new ButtonInfo(
    `/Devices/Details/${device.serialNumber}`,
    { device },
    "View Device"
  );
  const properties = {
    Name: device.name,
    "Serial Number": device.serialNumber,
    Channel: channel
  };

  return (
    <DashboardCard title={cardTitle} button={button}>
      <Grid container>
        <Grid item xs={12}>
          <SimpleTable properties={properties} />
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

StreamDetailsDeviceCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  channel: PropTypes.number.isRequired
};
