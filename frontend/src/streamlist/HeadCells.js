import React from 'react'
import {
    TableCell,
    TableSortLabel,
    Typography,
} from "@material-ui/core"
import HeadCell from '../model/HeadCell'

export default class StreamListHeadCells extends React.Component {
    constructor(props) {
        super(props)
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
            new HeadCell("timeelapsed", "Time Elapsed", true, true),
        ];
    }

    render() {
        return (
            <React.Fragment>
                {this.headcells.map((headCell) =>(
                    <TableCell
                        className="tableHeadCell lightestGrey"
                        key={headCell.id}
                        padding={headCell.padding ? 'default' : 'none'}>
                            <TableSortLabel>
                                <Typography component={'span'} variant="caption">
                                    {headCell.label}
                                </Typography>
                            </TableSortLabel>
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }
}