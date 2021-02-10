import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

export default function DynamicBreadcrumb(props) {
  const { breadcrumbs } = props;
  return (
    <Box padding="2em 0em 0em 1em">
      <Breadcrumbs aria-label="breadcrumb" id="breadcrumbParent">
        {breadcrumbs.map((crumb, i) => {
          return (
            <Link
              color="inherit"
              href={crumb[1]}
              id={`breadcrumb${i}`}
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
  breadcrumbs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};
