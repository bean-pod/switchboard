import React from "react";
import PropTypes from "prop-types";

import StreamInfo from "../model/StreamInfo";
import * as SampleData from "../api/SampleData";
import StreamDetailsWrapper from "./StreamDetailsWrapper";
import Page from "../general/Page";

export default function StreamDetailsPage(props) {
  const { streamDetails } = props;
  const breadcrumbs = [
    ["Home", "/"],
    ["Streaming", "/Streaming"],
    ["Details", "/Details"],
    [streamDetails.id, streamDetails.id]
  ];

  return (
    <Page title="Stream Details" breadcrumbs={breadcrumbs}>
      <StreamDetailsWrapper streamDetailSource={streamDetails} />
    </Page>
  );
}

StreamDetailsPage.defaultProps = {
  streamDetails: SampleData.getAllStreams()[0]
};

StreamDetailsPage.propTypes = {
  streamDetails: PropTypes.instanceOf(StreamInfo)
};
