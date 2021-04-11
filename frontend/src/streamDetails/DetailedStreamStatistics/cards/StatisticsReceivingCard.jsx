import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import StreamStatisticsInfo from "../../../model/StreamStatistics/StreamStatisticsInfo";
import SimpleTable from "../../../general/simpleTable/SimpleTable";

export default function StatisticsReceivingCard(props) {
  const { stats } = props;

  const properties = {
    Packets: stats.receive.packets,
    "Packets Lost": stats.receive.packetsLost,
    "Packets Dropped": stats.receive.packetsDropped,
    "Packets Retransmitted": stats.receive.packetsRetransmitted,
    "Packets Belated": stats.receive.packetsBelated,
    Bytes: stats.receive.bytes,
    "Bytes Lost": stats.receive.bytesLost,
    "Bytes Dropped": stats.receive.bytesDropped,
    "Bitrate (Mbps)": stats.receive.mbitRate
  };

  return (
    <DashboardCard title="Receiving Statistics">
      <Grid item xs={12}>
        <SimpleTable properties={properties} />
      </Grid>
    </DashboardCard>
  );
}

StatisticsReceivingCard.propTypes = {
  stats: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
