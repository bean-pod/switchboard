import React from "react";
import PropTypes from "prop-types";
import StreamsTableWrapper from "./StreamsTableWrapper";
import Page from "../general/Page";

export default function StreamListPage(props) {
  const { dataSource } = props;
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streaming"]
  ];
  return (
    <Page title="Active Streams" breadcrumbs={breadcrumbs}>
      <StreamsTableWrapper dataSource={dataSource} />
    </Page>
  );
}

StreamListPage.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
