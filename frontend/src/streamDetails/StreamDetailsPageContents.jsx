import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid } from "@material-ui/core";

import StreamInfo from "../model/StreamInfo";
import DashboardCard from "../general/dashboard/DashboardCard";
import StreamDeviceDetailsCard from "./StreamDeviceDetailsCard";
import DeleteStreamDialogOpener from "./DeleteStreamDialogOpener";

export default function StreamDetailsPageContents(props) {
  const { stream } = props;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <StreamDeviceDetailsCard
            cardTitle="Sender Details"
            device={stream.sender}
            channel={stream.outputChannel}
          />
        </Grid>
        <Grid item xs={6}>
          <StreamDeviceDetailsCard
            cardTitle="Receiver Details"
            device={stream.receiver}
            channel={stream.inputChannel}
          />
        </Grid>
        <Grid item xs={7}>
          <DashboardCard title="Logs" />
        </Grid>
        <Grid item xs={5}>
          <DashboardCard title="Statistics" />
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
