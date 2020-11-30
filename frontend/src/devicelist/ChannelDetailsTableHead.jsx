import React from "react";
import { TableCell, TableHead, TableRow } from "@material-ui/core";

export default function ChannelDetailsTableHead() {
  return (
    <TableRow>
      <TableCell className="lightGrey">ID</TableCell>
      <TableCell className="lightGrey">Name</TableCell>
      <TableCell className="lightGrey">Port</TableCell>
    </TableRow>
  );
}
