import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DeviceDetailsTabTable from "./DeviceDetailsTabTable";
import DeviceInfo from "../model/DeviceInfo";
import { getSampleSender } from "../api/SampleData";
import DeviceDetailsCard from "./DeviceDetailsCard";

export default function DeviceDetailsPageContents(props) {
  const { device } = props;
  const tabs = ["Activity Log", "Notes"];

  return (
    <Grid container>
      <Grid item xs={6}>
       <DeviceDetailsCard device = {device}/>
      </Grid>
      <Grid item xs={6}>
        <DeviceDetailsTabTable tabs={tabs} device={device} />
      </Grid>
    </Grid>
  );
}
DeviceDetailsPageContents.defaultProps = {
  device: getSampleSender()
};

DeviceDetailsPageContents.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo)
};
