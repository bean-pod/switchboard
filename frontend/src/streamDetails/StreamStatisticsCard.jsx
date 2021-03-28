import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import SimpleTable from "../general/simpleTable/SimpleTable";
import zipProperties from "../general/simpleTable/SimpleTableUtil";
import StreamStatisticsButton from "./DetailedStreamStatistics/StreamStatisticsButton";
import { getStreamStatistics } from "../api/StreamApi";

export default class StreamStatisticsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    }
    this.streamId = props.streamId;
    this.handleStatsChange = this.handleStatsChange.bind(this);
  }

  componentDidMount() {
    getStreamStatistics(this.streamId).then(this.handleStatsChange);
  }

  handleStatsChange(stats) {
    this.setState({
      stats
    });
  }

  render() {
    const { stats } = this.state;
    const propertyNames = ["Time"];
    const properties = [stats.time];
  
    const propertyPairs = zipProperties(propertyNames, properties);
    return (
      <>
        <DashboardCard title="Statistics">
          <Grid container>
            <Grid item xs={12}>
              <SimpleTable propertyPairs={propertyPairs} />
            </Grid>
            <Grid item xs={12}>
              <Box className="alignRightFloatPadded">
                <StreamStatisticsButton statistics={stats} />
              </Box>
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
