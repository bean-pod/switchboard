import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import StatisticsOverviewCard from "./cards/StatisticsOverviewCard";
import StatisticsSendingCard from "./cards/StatisticsSendingCard";
import StatisticsReceivingCard from "./cards/StatisticsReceivingCard";

export default function StreamStatisticsPageContents(props) {
  const { statistics } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <StatisticsOverviewCard stats={statistics} />
      </Grid>
      <Grid item xs={4}>
        <StatisticsSendingCard stats={statistics} />
      </Grid>
      <Grid item xs={4}>
        <StatisticsReceivingCard stats={statistics} />
      </Grid>
    </Grid>
  );
}

StreamStatisticsPageContents.propTypes = {
  statistics: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
