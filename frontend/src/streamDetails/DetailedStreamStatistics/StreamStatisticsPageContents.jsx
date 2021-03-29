import React from "react";
import PropTypes from "prop-types";
import { Container, Grid } from "@material-ui/core";

import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import StatisticsOverviewCard from "./StatisticsOverviewCard";
import StatisticsSendingCard from "./StatisticsSendingCard";
import StatisticsReceivingCard from "./StatisticsReceivingCard";

export default function StreamStatisticsPageContents(props) {
  const { statistics } = props;

  return (
    <Container>
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
    </Container>
  );
}

StreamStatisticsPageContents.propTypes = {
  statistics: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
