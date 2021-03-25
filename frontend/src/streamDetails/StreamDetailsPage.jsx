import React from "react";
import PropTypes from "prop-types";

import StreamInfo from "../model/StreamInfo";
import * as SampleData from "../api/SampleData";
import StreamDetailsPageContents from "./StreamDetailsPageContents";
import Page from "../general/Page";

export default function StreamDetailsPage(props) {
  const {
    location: {
      state: { stream }
    }
  } = props;

  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"],
    [`Stream Details`, `/Streams/Details/${stream.id}`]
  ];

  return (
    <Page title="Stream Details" breadcrumbs={breadcrumbs}>
      <StreamDetailsPageContents stream={stream} />
    </Page>
  );
}

StreamDetailsPage.defaultProps = {
  location: { state: { stream: SampleData.getSampleStream() } }
};

StreamDetailsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      stream: PropTypes.instanceOf(StreamInfo)
    })
  })
};
