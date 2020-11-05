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

import StatusIndicator from './StreamStatusIndicator'
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
                <TableRow key={this.props.row.id} class="singleStreamRow">
                    <TableCell class="tableCell dropdownButton" style={{ width: 1, padding: 0, paddingLeft: 5 }}>
                        <IconButton onClick={() => this.setState({ open: !this.state.open })}>
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </TableCell>
                    <TableCell class="tableCell numeric">{this.props.row.id}</TableCell>
                    <TableCell class="tableCell">{this.props.row.date}</TableCell>
                    <TableCell class="tableCell">{this.props.row.sender.name}</TableCell>
                    <TableCell class="tableCell">{this.props.row.receiver.name}</TableCell>
                    <TableCell class="tableCell">
                        {(StatusIndicator(this.props))}
                    </TableCell>
                    <TableCell class="tableCell">{this.props.row.type}</TableCell>
                    <TableCell class="tableCell">{this.props.row.time}</TableCell>
                    <TableCell class="tableCell">
                        {ActionButtons()}
                    </TableCell>
                </TableRow>
                <TableRow class="streamDetails">
                    <TableCell class="chevronText lightestGrey" colSpan={9}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={2}>
                                <Typography variant="caption">
                                    {this.rowExtras(this.props.row.extras)}
                                </Typography>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}