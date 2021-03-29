import React from "react";
import PropTypes from "prop-types";
import { Container, Grid } from "@material-ui/core";

import GridColumn from "../../general/dashboard/GridColumn";
import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import StatisticsOverviewCard from "./StatisticsOverviewCard";
import StatisticsSendingCard from "./StatisticsSendingCard";
import StatisticsReceivingCard from "./StatisticsReceivingCard";

export default function StreamStatisticsPageContents(props) {
  const { statistics } = props;
  
  return (
    <Container>
      <Grid conatiner spacing={3}>
        <GridColumn width={6}>
          <Grid item xs={12}>
            <StatisticsOverviewCard stats={statistics} />
          </Grid>
        </GridColumn>
        <GridColumn width={6}>
          <Grid item xs={6}>
            <StatisticsSendingCard stats={statistics} />
          </Grid>
          <Grid item xs={6}>
            <StatisticsReceivingCard stats={statistics} />
          </Grid>
        </GridColumn>
      </Grid>
    </Container>
  );
}

StreamStatisticsPageContents.propTypes = {
  statistics: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
