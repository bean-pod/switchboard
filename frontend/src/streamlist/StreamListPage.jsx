import React from "react";
import Page from "../general/Page";
import DetailedStreamsTableWrapper from "./DetailedStreamsTableWrapper";

export default function StreamListPage() {
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"]
  ];
  return (
    <Page title="Active Streams" breadcrumbs={breadcrumbs} hasStreamButton>
      <DetailedStreamsTableWrapper />
    </Page>
  );
}
