import React from "react";
import PropTypes from "prop-types";
import Page from "../general/Page";
import StreamingTable from "./StreamingTable";

export default function CreateStreamPage(props) {
  const { dataSource } = props;
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streaming"],
    ["New Stream", "/Streaming/New"]
  ];
  return (
    <Page title="Create a Stream" breadcrumbs={breadcrumbs}>
      <StreamingTable dataSource={dataSource} />
    </Page>
  );
}

CreateStreamPage.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
