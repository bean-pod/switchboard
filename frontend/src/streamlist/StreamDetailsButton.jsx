import React from "react";
import PropTypes from "prop-types";

import StreamInfo from "../model/StreamInfo";
import DetailsButton from "../general/Buttons/DetailsButton";

export default function StreamDetailsButton(props) {
  const { streamInfo } = props;

  const navLinkInfo = {
    pathname: `/Streams/Details/${streamInfo.id}`,
    state: { stream: streamInfo }
  };

  return (
    <>
      <DetailsButton
        navLinkInfo={navLinkInfo}
        tooltipTitle="View Stream Details"
      />
    </>
  );
}

StreamDetailsButton.propTypes = {
  streamInfo: PropTypes.instanceOf(StreamInfo).isRequired
};
