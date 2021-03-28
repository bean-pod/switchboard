import React from "react";
import PropTypes from "prop-types";

import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";
import Page from "../../general/Page";
import StreamStatisticsPageContents from "./StreamStatisticsPageContents";

export default function StreamStatisticsPage(props) {
  const {
    location: {
      state: { statistics }
    }
  } = props;
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"],
    ["Stream Details", `/Streams/Details/${statistics.id}`],
    ["Statistics", `/Streams/Details/${statistics.id}/Statistics`]
  ];

  return (
    <Page title={`Stream ${streamId} Statistics`} breadcrumbs={breadcrumbs}>
      <StreamStatisticsPageContents statistics={statistics} />
    </Page>
  );
}

StreamStatisticsPage.propTypes = {
  statistics: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
