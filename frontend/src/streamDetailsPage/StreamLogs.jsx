import React from "react";
import PropTypes from "prop-types";
import LogsTableWrapper from "../loglist/LogsTableWrapper";

export default function StreamLogs(props) {
  const { logsSource } = props;

  return <LogsTableWrapper logsDataSource={logsSource} />;
}

StreamLogs.propTypes = {
  logsSource: PropTypes.objectOf(PropTypes.func).isRequired
};
