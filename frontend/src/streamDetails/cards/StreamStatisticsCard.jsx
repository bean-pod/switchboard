import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import SimpleTable from "../../general/simpleTable/SimpleTable";
import { getStreamStatistics } from "../../api/StreamApi";
import ButtonInfo from "../../general/dashboard/ButtonInfo";
import StreamInfo from "../../model/StreamInfo";
import { snackbar } from "../general/SnackbarMessage";

export default class StreamStatisticsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: null
    };
    this.stream = props.stream;
    this.handleStatsChange = this.handleStatsChange.bind(this);
    this.getProperties = this.getProperties.bind(this);
    this.getButton = this.getButton.bind(this);
  }

  componentDidMount() {
    getStreamStatistics(this.stream.id)
      .then(this.handleStatsChange)
      .catch((error) => {
        snackbar(
          "error",
          `Failed to fetch stream statistics: ${error.message}`
        );
      });
  }

  handleStatsChange(stats) {
    this.setState({
      stats
    });
  }

  getProperties() {
    const { stats } = this.state;
    if (!stats) return {};
    return {
      Time: stats.time,
      "Round-Trip-Time": stats.link.rtt,
      "Packets Retransmitted": stats.send.packetsRetransmitted,
      "Packets Dropped": stats.send.packetsDropped
    };
  }

  getButton() {
    const { stats } = this.state;
    const { stream } = this.props;
    if (!stats) return null;
    return new ButtonInfo(
      `/Streams/Details/${stream.id}/Statistics`,
      { statistics: stats, stream },
      "More Statistics"
    );
  }

  render() {
    return (
      <DashboardCard title="Statistics" button={this.getButton()}>
        <Grid item xs={12}>
          <SimpleTable properties={this.getProperties()} />
        </Grid>
      </DashboardCard>
    );
  }
}

StreamStatisticsCard.propTypes = {
  stream: PropTypes.instanceOf(StreamInfo).isRequired
};
