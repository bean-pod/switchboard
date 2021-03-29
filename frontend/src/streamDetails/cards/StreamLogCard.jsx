import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamLogTableWrapper from "../StreamLogTableWrapper";

export default function StreamLogCard(props) {
  const { streamId } = props;

  return (
    <DashboardCard title="Logs">
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={12}>
          <StreamLogTableWrapper streamId={streamId} />
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

StreamLogCard.propTypes = {
  streamId: PropTypes.number.isRequired
};
