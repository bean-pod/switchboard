import React from 'react';
import {
    Box,
    Collapse,
    TableRow,
    TableCell,
    Typography,
    IconButton,
} from '@material-ui/core'
import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons/'

import StreamStatusIndicator from './StreamStatusIndicator'
import ActionButtons from './ActionButtons'

export default class SingleStreamRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    rowExtras(extras) {
        return extras.join(" ");
    }

    render() {
        return (
            <React.Fragment>
                <TableRow key={this.props.streamDetails.id} class="singleStreamRow">
                    <TableCell class="tableCell dropdownButton" style={{ width: 1, padding: 0, paddingLeft: 5 }}>
                        <IconButton onClick={() => this.setState({ open: !this.state.open })}>
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </TableCell>
                    <TableCell class="tableCell numeric">{this.props.streamDetails.id}</TableCell>
                    <TableCell class="tableCell">{this.props.streamDetails.date}</TableCell>
                    <TableCell class="tableCell">{this.props.streamDetails.sender.name}</TableCell>
                    <TableCell class="tableCell">{this.props.streamDetails.receiver.name}</TableCell>
                    <TableCell class="tableCell">
                        {(StreamStatusIndicator(this.props.streamDetails.status))}
                    </TableCell>
                    <TableCell class="tableCell">{this.props.streamDetails.type}</TableCell>
                    <TableCell class="tableCell">{this.props.streamDetails.time}</TableCell>
                    <TableCell class="tableCell actionButtons">
                        {ActionButtons()}
                    </TableCell>
                </TableRow>
                <TableRow class="streamDetails">
                    <TableCell class="chevronText lightestGrey" colSpan={9}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={2}>
                                <Typography variant="caption">
                                    {this.rowExtras(this.props.streamDetails.extras)}
                                </Typography>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}