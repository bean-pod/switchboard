import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import SimpleTable from "../../general/simpleTable/SimpleTable";

export default function StatisticsOverviewCard(props) {
  const { stats } = props;

  const properties = {
    "Stream ID": stats.id,
    Time: stats.time,
    Flow: stats.window.flow,
    Congestion: stats.window.congestion,
    Flight: stats.window.flight,
    Latency: stats.link.rtt,
    Bandwidth: stats.link.bandwidth,
    "Maximum Bandwidth": stats.link.maxBandwidth
  };

  return (
    <DashboardCard title="Overview">
      <Grid item xs={12}>
        <SimpleTable properties={properties} />
      </Grid>
    </DashboardCard>
  );
}

StatisticsOverviewCard.propTypes = {
  stats: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
