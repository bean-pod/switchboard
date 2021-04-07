import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamLogsTableWrapper from "../StreamLogsTableWrapper";
import * as streamLogsDataSource from "../../api/LogApi";

export default function StreamLogCard(props) {
  const { streamId } = props;

  return (
    <DashboardCard title="Logs">
      <Grid item xs={12}>
        <StreamLogsTableWrapper
          dataSource={streamLogsDataSource}
          streamId={streamId}
        />
      </Grid>
    </DashboardCard>
  );
}

StreamLogCard.propTypes = {
  streamId: PropTypes.number.isRequired
};
