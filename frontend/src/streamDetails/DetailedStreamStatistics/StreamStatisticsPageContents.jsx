import React from "react";
import PropTypes from "prop-types";
import { Container, Grid } from "@material-ui/core";

import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";

export default function StreamStatisticsPageContents(props) {
  const { statistics } = props;
  return (
    <Container>
      <Grid conatiner spacing={3}>
        {statistics ? "GOTEM" : "got none..."}
        <Grid item xs={12}>
          General info
        </Grid>
        <Grid item xs={6}>
          Sending stats
        </Grid>
        <Grid item xs={6}>
          Receiving stats
        </Grid>
      </Grid>
    </Container>
  );
}

StreamStatisticsPageContents.propTypes = {
  statistics: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
