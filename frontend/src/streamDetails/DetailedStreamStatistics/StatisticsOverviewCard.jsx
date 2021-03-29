import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import SimpleTable from "../../general/simpleTable/SimpleTable";
import zipProperties from "../../general/simpleTable/SimpleTableUtil";

export default function StatisticsOverviewCard(props) {
  const { stats } = props;

  const propertyNames = [
    "Stream ID",
    "Time",
    "Latency",
    "Bandwidth",
    "Maximum Bandwidth",
    "Flow",
    "Congestion",
    "Flight"
  ];
  const properties = [
    stats.id,
    stats.time,
    stats.window.rtt,
    stats.window.bandwidth,
    stats.window.maxBandwidth,
    stats.link.flow,
    stats.link.congestion,
    stats.link.flight
  ];

  const propertyPairs = zipProperties(propertyNames, properties);
  return (
    <>
      <DashboardCard title="Overview">
        <Grid container>
          <Grid item xs={12}>
            <SimpleTable propertyPairs={propertyPairs} />
          </Grid>
        </Grid>
      </DashboardCard>
    </>
  );
}

StatisticsOverviewCard.propTypes = {
  stats: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
