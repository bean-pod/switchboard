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
    stats.recv.packets,
    stats.recv.packetsLost,
    stats.recv.packetsDropped,
    stats.recv.packetsRetransmitted,
    stats.recv.packetsBelated,
    stats.recv.bytes,
    stats.recv.bytesLost,
    stats.recv.bytesDropped,
    stats.recv.mbitRate
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
