import React from "react";

import LogTableWrapper from "./LogTableWrapper";
import Page from "../general/Page";
import * as logsDataSource from "../api/LogApi";

export default function LogListPage() {
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Logs", "/Logs"]
  ];

  return (
    <Page title="Logs" breadcrumbs={breadcrumbs}>
      <LogTableWrapper logsDataSource={logsDataSource} />
    </Page>
  );
}
