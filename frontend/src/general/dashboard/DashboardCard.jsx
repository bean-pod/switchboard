import React from "react";
import PropTypes from "prop-types";
import "./dashboard.css";
import { Typography, Paper } from "@material-ui/core";

export default function DashboardCard(props) {
  const { title, children } = props;
  return (
    <>
      <Paper className="dashboardCard" elevation={2}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
