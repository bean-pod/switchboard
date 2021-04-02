import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import SimpleTable from "../general/simpleTable/SimpleTable";
import StreamStatisticsButton from "./DetailedStreamStatistics/StreamStatisticsButton";
import { getStreamStatistics } from "../api/StreamApi";
import ButtonInfo from "../general/dashboard/ButtonInfo";

export default class StreamStatisticsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    };
    this.streamId = props.streamId;
    this.handleStatsChange = this.handleStatsChange.bind(this);
    this.getProperties = this.getProperties.bind(this);
  }

  componentDidMount() {
    getStreamStatistics(this.streamId).then(this.handleStatsChange);
  }

  handleStatsChange(stats) {
    this.setState({
      stats
    });
  }

  getProperties() {
    const { stats } = this.state;
    if (stats.length === 0) return {};
    return {
      "Time": stats.time,
      "Round-Trip-Time": stats.link.rtt,
      "Packets Retransmitted": stats.send.packetsRetransmitted,
      "Packets Dropped": stats.send.packetsDropped
    };
  }

  render() {
    const { stats } = this.state;
    const properties = this.getProperties();

    const button = new ButtonInfo(
      `/Streams/Details/${stats.id}/Statistics`,
      { statistics: stats },
      "More Statistics"
    );

    return (
      <>
        <DashboardCard title="Statistics" button={button}>
          <Grid container>
            <Grid item xs={12}>
              <SimpleTable properties={properties} />
            </Grid>
          </Grid>
        </DashboardCard>
      </>
    );
  }
}

StreamStatisticsCard.propTypes = {
  streamId: PropTypes.number.isRequired
};
