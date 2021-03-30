import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import UploadConfigDialogOpenButton from "../configuration/UploadConfigDialogOpenButton";
import DownloadConfigButton from "../configuration/DownloadConfigButton";

import DeviceInfo from "../../model/DeviceInfo";

export default function DeviceConfigActionsCard(props) {
  const { device } = props;
  return (
    <DashboardCard title="Configuration">
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={4}>
          <UploadConfigDialogOpenButton device={device} />
        </Grid>
        <Grid item xs={4}>
          <DownloadConfigButton device={device} />
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

DeviceConfigActionsCard.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
