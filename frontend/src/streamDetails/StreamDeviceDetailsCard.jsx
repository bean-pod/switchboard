import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DeviceInfo from "../model/DeviceInfo";
import DashboardCard from "../general/dashboard/DashboardCard";
import SimpleTable from "../general/simpleTable/SimpleTable";

export default function StreamDeviceDetailsCard(props) {
  const { cardTitle, device, channel } = props;

  const propertyNames = ["Name", "Serial Number", "Channel"];
  const properties = [device.name, device.serialNumber, channel];

  return (
    <>
      <DashboardCard title={cardTitle}>
        <Grid container>
          <Grid item xs={12}>
            <SimpleTable propertyNames={propertyNames} properties={properties} />
          </Grid>
        </Grid>
      </DashboardCard>
    </>
  );
}

StreamDeviceDetailsCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  channel: PropTypes.number.isRequired
};
