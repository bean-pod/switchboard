import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid } from "@material-ui/core";

import StreamInfo from "../model/StreamInfo";
import DashboardCard from "../general/dashboard/DashboardCard";
import StreamDeviceDetails from "./StreamDeviceDetails";
import DeleteStreamDialogOpener from "./DeleteStreamDialogOpener";
// import StreamLogs from "./StreamLogs";
// import { getSampleStream } from "../api/SampleStream";

export default function StreamDetailsWrapper(props) {
  const { streamDetailSource } = props;
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <DashboardCard title="Sender Details">
            <StreamDeviceDetails
              device={streamDetailSource.sender}
              channel={streamDetailSource.outputChannel}
            />
          </DashboardCard>
          channel=
          {streamDetailSource.outputChannel}
        </Grid>
        <Grid item xs={6}>
          <DashboardCard title="Receiver Details">
            <StreamDeviceDetails
              device={streamDetailSource.receiver}
              channel={streamDetailSource.inputChannel}
            />
          </DashboardCard>
        </Grid>
        <Grid item xs={7}>
          <DashboardCard title="Logs">
            {/* <StreamLogs logsSource={ FILL IN FUNCTION HERE} /> */}
          </DashboardCard>
        </Grid>
        <Grid item xs={5}>
          <DashboardCard title="Statistics">
            {/* TODO: fill in once stream stats are up */}
          </DashboardCard>
        </Grid>
      </Grid>
      <Box className="alignRightFloatPadded">
        <DeleteStreamDialogOpener deleteId={streamDetailSource.id} />
      </Box>
    </Container>
  );
}

StreamDetailsWrapper.propTypes = {
  streamDetailSource: PropTypes.instanceOf(StreamInfo).isRequired
};
