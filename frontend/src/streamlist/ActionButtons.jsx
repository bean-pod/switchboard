import React from "react";
import { IconButton } from "@material-ui/core";
import { Block, Pause, Sync } from "@material-ui/icons";

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
        <IconButton>
          <Block />
        </IconButton>
      </div>
    </>
  );
}
