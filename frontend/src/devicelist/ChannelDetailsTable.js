import React from "react";
import {
    TableBody,
    TableCell,
    TableRow
} from "@material-ui/core";

export default class ChannelDetailsTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ margin: "1em" }}>
                <TableBody className="flexContents">
                    <TableRow>
                        <TableCell className="lightGrey">ID</TableCell>
                        <TableCell className="lightGrey">Name</TableCell>
                        <TableCell className="lightGrey">Port</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{this.props.channel.id}</TableCell>
                        <TableCell>{this.props.channel.name}</TableCell>
                        <TableCell>{this.props.channel.port}</TableCell>
                    </TableRow>
                </TableBody>
            </div>

        )
    }
}