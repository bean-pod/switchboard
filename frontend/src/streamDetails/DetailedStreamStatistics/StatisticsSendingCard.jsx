import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import SimpleTable from "../../general/simpleTable/SimpleTable";
import zipProperties from "../../general/simpleTable/SimpleTableUtil";

export default function StatisticsSendingCard(props) {
  const { stats } = props;

  const propertyNames = [
    "Packets",
    "Packets Lost",
    "Packets Dropped",
    "Packets Retransmitted",
    "Bytes",
    "Bytes Dropped",
    "MegaBit Rate"
  ];
  const properties = [
    stats.send.packets,
    stats.send.packetsLost,
    stats.send.packetsDropped,
    stats.send.packetsRetransmitted,
    stats.send.bytes,
    stats.send.bytesDropped,
    stats.send.mbitRate
  ];

  const propertyPairs = zipProperties(propertyNames, properties);
  return (
    <>
      <DashboardCard title="Sending Statistics">
        <Grid container>
          <Grid item xs={12}>
            <SimpleTable propertyPairs={propertyPairs} />
          </Grid>
        </Grid>
      </DashboardCard>
    </>
  );
}

StatisticsSendingCard.propTypes = {
  stats: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
