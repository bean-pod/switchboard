import React from "react";
import { Button, Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";

export default function UnselectedDeviceCard(props) {
  const { title, onClick } = props;

  return (
    <DashboardCard title={title}>
      <Grid item xs={4}>
        <Button onClick={onClick}>{`Select ${title}`}</Button>
      </Grid>
    </DashboardCard>
  );
}

UnselectedDeviceCard.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
