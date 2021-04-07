import React from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@material-ui/core";

import DashboardCard from "../../general/dashboard/DashboardCard";

export default function UnselectedDeviceCard(props) {
  const { title, onClick } = props;

  return (
    <DashboardCard title={title}>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={onClick}>
          {`Select ${title}`}
        </Button>
      </Grid>
    </DashboardCard>
  );
}

UnselectedDeviceCard.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
