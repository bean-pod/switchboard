import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import StreamStatisticsInfo from "../../model/StreamStatistics/StreamStatisticsInfo";

export default function StreamStatisticsButton(props) {
  const { statistics } = props;

  return (
    <>
      <NavLink
        activeClassName="hideLinkStyle"
        className="hideLinkStyle"
        to={{
          pathname: `/Streams/Details/${statistics.id}/Statistics`,
          state: { statistics }
        }}
      >
        <Button variant="contained">More Statistics</Button>
      </NavLink>
    </>
  );
}

StreamStatisticsButton.propTypes = {
  statistics: PropTypes.instanceOf(StreamStatisticsInfo).isRequired
};
