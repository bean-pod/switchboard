import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import SimpleTable from "../../general/simpleTable/SimpleTable";
import zipProperties from "../../general/simpleTable/SimpleTableUtil";

export default function StatisticsReceivingCard(props) {
  const { stats } = props;

  const propertyNames = [
    "Packets",
    "Packets Lost",
    "Packets Dropped",
    "Packets Retransmitted",
    "Packets Belated",
    "Bytes",
    "Bytes Lost",
    "Bytes Dropped",
    "MegaBit Rate"
  ];
  const properties = [
    stats.receive.packets,
    stats.receive.packetsLost,
    stats.receive.packetsDropped,
    stats.receive.packetsRetransmitted,
    stats.receive.packetsBelated,
    stats.receive.bytes,
    stats.receive.bytesLost,
    stats.receive.bytesDropped,
    stats.receive.mbitRate
  ];

  const propertyPairs = zipProperties(propertyNames, properties);
  return (
    <>
      <DashboardCard title="Receiving Statistics">
        <Grid container>
          <Grid item xs={12}>
            <SimpleTable propertyPairs={propertyPairs} />
          </Grid>
        </Grid>
      </DashboardCard>
    </>
  );
}

StatisticsReceivingCard.propTypes = {
  stats: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
