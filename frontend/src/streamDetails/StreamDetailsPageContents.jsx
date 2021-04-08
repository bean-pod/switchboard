import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid } from "@material-ui/core";

import StreamInfo from "../model/StreamInfo";
import StreamDetailsDeviceCard from "./StreamDetailsDeviceCard";
import DeleteStreamDialogOpener from "./DeleteStreamDialogOpener";
import StreamStatisticsCard from "./StreamStatisticsCard";
import StreamLogCard from "./cards/StreamLogCard";

export default function StreamDetailsPageContents(props) {
  const { stream } = props;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <StreamDetailsDeviceCard
            cardTitle="Sender Details"
            device={stream.sender}
            channel={stream.outputChannel}
          />
        </Grid>
        <Grid item xs={6}>
          <StreamDetailsDeviceCard
            cardTitle="Receiver Details"
            device={stream.receiver}
            channel={stream.inputChannel}
          />
        </Grid>
        <Grid item xs={7}>
          <StreamLogCard streamId={stream.id} />
        </Grid>
        <Grid item xs={5}>
          <StreamStatisticsCard streamId={stream.id} />
        </Grid>
      </Grid>
      <Box className="alignRightFloatPadded">
        <DeleteStreamDialogOpener deleteId={stream.id} />
      </Box>
    </Container>
  );
}

StreamDetailsPageContents.propTypes = {
  stream: PropTypes.instanceOf(StreamInfo).isRequired
};
