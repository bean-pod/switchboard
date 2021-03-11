import React from "react";
import PropTypes from "prop-types";

import StreamInfo from "../model/StreamInfo";
import * as SampleData from "../api/SampleData";
import StreamDetailsWrapper from "./StreamDetailsWrapper";
import Page from "../general/Page";

export default function StreamDetailsPage(props) {
  const {
    location: {
      state: { stream }
    }
  } = props;

  const breadcrumbs = [
    ["Home", "/"],
    ["Active Streams", "/Streams"],
    [`Stream Details`, `/Details/${stream.id}`]
  ];

  return (
    <Page title="Stream Details" breadcrumbs={breadcrumbs}>
      <StreamDetailsWrapper streamDetailSource={stream} />
    </Page>
  );
}

StreamDetailsPage.defaultProps = {
  location: { state: { stream: SampleData.getAllStreams()[0] } }
};

StreamDetailsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      stream: PropTypes.instanceOf(StreamInfo)
    })
  })
};
