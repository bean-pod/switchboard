import React from "react";
import Page from "../general/Page";
import StreamingTable from "./StreamingTable";

export default function CreateStreamPage(props) {
  const { dataSource } = props;
  const breadcrumbs = [
    ["Home", "/Home"],
    ["My Streams", "/Streams"],
    ["New Stream", "/Streams/New"]
  ];
  return (
    <Page title="Create a Stream" breadcrumbs={breadcrumbs}>
      <StreamingTable dataSource={dataSource} />
    </Page>
  );
}
