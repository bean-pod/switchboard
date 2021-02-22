import React from "react";
import PropTypes from "prop-types";
import "./homepage.css";
import { Typography, Paper } from "@material-ui/core";

export default function DashCard(props) {
  const { title, children } = props;
  return (
    <>
      <Paper className="dashboardCard">
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {children}
      </Paper>
    </>
  );
}

DashCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
