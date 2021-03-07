import React from "react";
import PropTypes from "prop-types";

import LogsTableWrapper from "./LogsTableWrapper";
import Page from "../general/Page";

export default function LogListPage(props) {
  const { logsDataSource } = props;
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Logs", "/Logs"]
  ];

  return (
    <Page title="Logs" breadcrumbs={breadcrumbs}>
      <LogsTableWrapper logsDataSource={logsDataSource} />
    </Page>
  );
}

LogListPage.propTypes = {
  logsDataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
