import React from "react";
import Page from "../general/Page";
import StreamingTable from "./StreamingTable";

export default function CreateStreamPage() {
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"],
    ["New Stream", "/Streams/New"]
  ];
  return (
    <Page title="Create a Stream" breadcrumbs={breadcrumbs} buttonName="viewStreams">
      <StreamingTable />
    </Page>
  );
}
