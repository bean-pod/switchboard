import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DeviceInfo from "../../model/DeviceInfo";
import DashboardCard from "../../general/dashboard/DashboardCard";
import ChannelDetailsTable from "../../devicelist/ChannelDetailsTable";

export default function DeviceChannelCard(props) {
  const {
    device: { channels }
  } = props;

  return (
    <DashboardCard title="Channels">
      <Grid item xs={12}>
        <ChannelDetailsTable channels={channels} />
      </Grid>
    </DashboardCard>
  );
}

DeviceChannelCard.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
