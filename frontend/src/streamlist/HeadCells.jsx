import React from "react";
import { TableCell, TableSortLabel, Typography } from "@material-ui/core";
import HeadCell from "../model/HeadCell";

export default class HeadCells extends React.Component {
  constructor(props) {
    super(props);
    this.headcells = this.getHeadCellData();
  }

  getHeadCellData() {
    return [
      new HeadCell("id", "ID", true, true),
      new HeadCell("date", "Date", true, true),
      new HeadCell("sendername", "Sender", false, true),
      new HeadCell("receivername", "Receiver", false, true),
      new HeadCell("status", "Status", false, true),
      new HeadCell("type", "Type", false, true),
      new HeadCell("timeelapsed", "Time Elapsed", true, true)
    ];
  }

  render() {
    return (
      <>
        <TableCell
          className="tableHeadCell lightestGrey"
          style={{ width: 1, padding: 0, paddingLeft: 5 }}
        />

        {this.headcells.map((headCell) => (
          <TableCell
            className="tableHeadCell lightestGrey"
            key={headCell.id}
            padding={headCell.padding ? "default" : "none"}
          >
            <TableSortLabel>
              <Typography component="span" variant="caption">
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className="tableHeadCell lightestGrey" align="center">
          <Typography variant="caption">Actions</Typography>
        </TableCell>
      </>
    );
  }
}
