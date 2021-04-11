import React from "react";
import Page from "../general/Page";
import DetailedStreamTableWrapper from "./DetailedStreamTableWrapper";

export default function StreamListPage() {
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"]
  ];
  return (
    <Page title="Active Streams" breadcrumbs={breadcrumbs} hasStreamButton>
      <DetailedStreamTableWrapper />
    </Page>
  );
}
