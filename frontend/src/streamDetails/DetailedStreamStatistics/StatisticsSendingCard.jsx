import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import SimpleTable from "../../general/simpleTable/SimpleTable";

export default function StatisticsSendingCard(props) {
  const { stats } = props;

  const properties = {
    Packets: stats.send.packets,
    "Packets Lost": stats.send.packetsLost,
    "Packets Dropped": stats.send.packetsDropped,
    "Packets Retransmitted": stats.send.packetsRetransmitted,
    Bytes: stats.send.bytes,
    "Bytes Dropped": stats.send.bytesDropped,
    "Bitrate (Mbps)": stats.send.mbitRate
  };

  return (
    <>
      <DashboardCard title="Sending Statistics">
        <Grid item xs={12}>
          <SimpleTable properties={properties} />
        </Grid>
      </DashboardCard>
    </>
  );
}

StatisticsSendingCard.propTypes = {
  stats: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
