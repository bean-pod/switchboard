import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid } from "@material-ui/core";

import StreamInfo from "../model/StreamInfo";
// import { getSampleStream } from "../api/SampleStream";

export default function StreamDetailsWrapper(props) {
  const { streamDetailSource } = props;
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          Sender Details
        </Grid>
        <Grid item xs={6}>
          Receiver Details
        </Grid>
        <Grid item xs={7}>
          Logs
        </Grid>
        <Grid item xs={5}>
          Statistics
        </Grid>
      </Grid>
    </Container>
  );
}

StreamDetailsWrapper.propTypes = {
  streamDetailSource: PropTypes.instanceOf(StreamInfo).isRequired
};
