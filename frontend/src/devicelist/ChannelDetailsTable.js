import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

export default class ChannelDetailsTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell className="lightGrey">ID</TableCell>
                    <TableCell>{this.props.channel.id}</TableCell>
                    <TableCell className="lightGrey">Name</TableCell>
                    <TableCell>{this.props.channel.name}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell className="lightGrey">Port</TableCell>
                    <TableCell>{this.props.channel.port}</TableCell>
                    {this.props.channel.hasOwnProperty("decoder") ?
                        (<React.Fragment>
                            <TableCell className="lightGrey">Decoder</TableCell>
                            <TableCell>{this.props.channel.decoder}</TableCell>
                        </React.Fragment>
                        ):
                        (<React.Fragment>
                            <TableCell className="lightGrey">Encoder</TableCell>
                            <TableCell>{this.props.channel.encoder}</TableCell>
                        </React.Fragment>
                        )                    
                    }

                </TableRow>
            </React.Fragment>
        )
    }
}