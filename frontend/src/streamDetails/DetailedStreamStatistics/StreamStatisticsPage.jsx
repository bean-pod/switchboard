import React from "react";
import PropTypes from "prop-types";

import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import Page from "../../general/Page";
import StreamStatisticsPageContents from "./StreamStatisticsPageContents";

export default function StreamStatisticsPage(props) {
  const {
    location: {
      state: { statistics, stream }
    }
  } = props;
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"],
    ["Stream Details", `/Streams/Details/${stream.id}`, { stream }],
    [
      "Statistics",
      `/Streams/Details/${stream.id}/Statistics`,
      { statistics, stream }
    ]
  ];

  return (
    <Page title="Stream Statistics" breadcrumbs={breadcrumbs}>
      <StreamStatisticsPageContents statistics={statistics} />
    </Page>
  );
}

StreamStatisticsPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      statistics: PropTypes.instanceOf(StreamStatisticsInfo)
    })
  }).isRequired
};
