import React from "react";
import { Box, Breadcrumbs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import DeviceInfo from "../model/DeviceInfo";

export default function DynamicBreadcrumb(props) {
  const { breadcrumbs } = props;
  return (
    <Box padding="2em 0em 0em 1em">
      <Breadcrumbs aria-label="breadcrumb" id="breadcrumbParent">
        {breadcrumbs.map((crumb) => {
          return (
            <NavLink
              to={{
                pathname: crumb[1],
                state: crumb[2]
              }}
              key={`breadcrumb ${crumb[0]}`}
            >
              <Typography color="textPrimary">{crumb[0]}</Typography>
            </NavLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
DynamicBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.instanceOf(DeviceInfo)
    ])
  ).isRequired
};
