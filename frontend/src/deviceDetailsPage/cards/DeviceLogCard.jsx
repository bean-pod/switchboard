import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DeviceInfo from "../../model/DeviceInfo";
import DashboardCard from "../../general/dashboard/DashboardCard";
import DeviceLogTableWrapper from "../DeviceLogTableWrapper";
import * as deviceLogsDataSource from "../../api/LogApi";

export default function DeviceLogCard(props) {
  const { device } = props;

  return (
    <DashboardCard title="Logs">
      <Grid item xs={12}>
        <DeviceLogTableWrapper
          dataSource={deviceLogsDataSource}
          device={device}
        />
      </Grid>
    </DashboardCard>
  );
}

DeviceLogCard.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
