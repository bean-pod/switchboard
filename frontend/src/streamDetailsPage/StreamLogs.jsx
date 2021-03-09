import React from "react";
import PropTypes from "prop-types";
import LogsTableWrapper from "../loglist/LogsTableWrapper";

export default function StreamLogs(props) {
  const { streamLogs } = props;

  return <LogsTableWrapper logsDataSource={streamLogs} />;
}

StreamLogs.propTypes = {
  streamLogs: PropTypes.objectOf(PropTypes.func).isRequired
};
