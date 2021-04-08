import React from "react";
import PropTypes from "prop-types";

import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import Page from "../../general/Page";
import StreamStatisticsPageContents from "./StreamStatisticsPageContents";
import { getSampleStreamStats } from "../../api/SampleData";

export default function StreamStatisticsPage(props) {
  const {
    location: {
      state: { statistics }
    }
  } = props;
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"],
    ["Stream Details"],
    ["Statistics", `/Streams/Details/${statistics.id}/Statistics`]
  ];

  return (
    <Page title="Stream Statistics" breadcrumbs={breadcrumbs}>
      <StreamStatisticsPageContents statistics={statistics} />
    </Page>
  );
}

StreamStatisticsPage.defaultProps = {
  location: { state: { statistics: getSampleStreamStats() } }
};

StreamStatisticsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      statistics: PropTypes.instanceOf(StreamStatisticsInfo)
    })
  })
};
