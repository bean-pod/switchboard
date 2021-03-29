import React from "react";
import Page from "../general/Page";
import StreamsTableWrapper from "./StreamsTableWrapper";
import * as streamDataSource from "../api/StreamApi";

export default function StreamListPage() {
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"]
  ];
  return (
    <Page
      title="Active Streams"
      breadcrumbs={breadcrumbs}
      buttonName="createStream"
    >
      <StreamsTableWrapper dataSource={streamDataSource} />
    </Page>
  );
}
