import React from "react";

import LogsTableWrapper from "./LogsTableWrapper";
import Page from "../general/Page";
import * as logsDataSource from "../api/LogApi";

export default function LogListPage() {
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
