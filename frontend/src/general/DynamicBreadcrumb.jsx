import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";
import DeviceInfo from "../model/DeviceInfo";
import StreamInfo from "../model/StreamInfo";

export default function DynamicBreadcrumb(props) {
  const { breadcrumbs } = props;
  return (
    <Box padding="2em 0em 0em">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNext fontSize="medium" />}
      >
        {breadcrumbs.map((crumb) => {
          return (
            <Link
              component={NavLink}
              to={{
                pathname: crumb[1],
                state: crumb[2] ? crumb[2] : null
              }}
              key={`breadcrumb ${crumb[0]}`}
            >
              <Typography color="textPrimary">{crumb[0]}</Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
DynamicBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.instanceOf(DeviceInfo),
            PropTypes.instanceOf(StreamInfo)
          ])
        )
      ])
    )
  ).isRequired
};
