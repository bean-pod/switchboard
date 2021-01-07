import React from "react";
import { IconButton } from "@material-ui/core";
import { Pause, Sync } from "@material-ui/icons";

import DeleteStream from "./DeleteStream";

export default function ActionButtons() {
  return (
    <>
      <div align="center">
        <IconButton>
          <Sync />
        </IconButton>
        <IconButton>
          <Pause />
        </IconButton>
        <DeleteStream />
      </div>
    </>
  );
}
