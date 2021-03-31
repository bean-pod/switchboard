import React from "react";
import PropTypes from "prop-types";
import "./dashboard.css";
import { Typography, Paper, Grid, Box } from "@material-ui/core";
import SmallCardButton from "./SmallCardButton";
import ButtonInfo from "./ButtonInfo";

export default function DashboardCard(props) {
  const { title, children, button } = props;
  return (
    <Paper className="dashboardCard" elevation={2}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Grid container justify="center" direction="row" spacing={3}>
        {children}
        {button ? (
          <Grid item xs={12}>
            <Box className="alignRightFloatPadded">
              <SmallCardButton button={button} />
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  button: PropTypes.instanceOf(ButtonInfo)
};

DashboardCard.defaultProps = {
  children: "",
  button: undefined
};
