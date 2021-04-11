import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import LogsTableWrapper from "../loglist/LogsTableWrapper";

export default function StreamLogsCard(props) {
  const { logsSource } = props;

  return (
    <>
      <DashboardCard title="Logs">
        <Grid container>
          <Grid item xs={12}>
            <LogsTableWrapper logsDataSource={logsSource} />
          </Grid>
        </Grid>
      </DashboardCard>
    </>
  );
}

StreamLogsCard.propTypes = {
  logsSource: PropTypes.objectOf(PropTypes.func).isRequired
};
