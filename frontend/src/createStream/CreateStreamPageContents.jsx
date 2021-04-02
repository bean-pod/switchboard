import React from "react";
import { Button, Grid } from "@material-ui/core";

export default function CreateStreamPageContents() {
  return (
    <Grid
      container
      justify="center"
      alignItems="stretch"
      direction="row"
      spacing={3}
    >
      <Grid item xs={5}>
        senderCard
      </Grid>
      <Grid item xs={2}>
        {"=>"}
      </Grid>
      <Grid item xs={5}>
        receiverCard
      </Grid>
      <Grid item xs={2}>
        <Button />
      </Grid>
    </Grid>
  );
}
