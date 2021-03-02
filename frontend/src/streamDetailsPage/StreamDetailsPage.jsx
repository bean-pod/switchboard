import React from "react";
// import PropTypes from "prop-types";
import { Box, Container, Grid } from "@material-ui/core";

import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
// import { getSampleStream } from "../api/SampleStream";

export default function StreamDetailsPage() {
  //   const { streamId } = props;
  //   const stream = getSampleStream();
  return (
    <Container>
      <DynamicBreadcrumb
        breadcrumbs={[
          ["Home", "/"],
          ["Stream Details", "/StreamDetails"]
          //   [streamId, streamId]
        ]}
      />
      <Box className="areaUnderBreadcrumbs">
        <Box className="flexContents headerAreaUnderline">
          <div className="title">Stream Details</div>
          <div className="alignRightFloat">
            <Box marginRight={2} marginTop={2}>
              {/* TODO: DELETE BUTTON */}
            </Box>
          </div>
        </Box>
      </Box>
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

// StreamDetailsPage.propTypes = {
//   streamId: PropTypes.string.isRequired
// };
