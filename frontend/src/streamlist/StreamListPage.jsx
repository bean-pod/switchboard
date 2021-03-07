import React from "react";
import PropTypes from "prop-types";
import StreamsTableWrapper from "./StreamsTableWrapper";
import Page from "../general/Page";

export default function StreamListPage(props) {
  const { streamDataSource } = props;
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streaming"]
  ];
  return (
    <Page title="Active Streams" breadcrumbs={breadcrumbs}>
      <StreamsTableWrapper dataSource={streamDataSource} />
    </Page>
  );
}

StreamListPage.propTypes = {
  streamDataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
