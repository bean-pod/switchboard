import React from 'react';
import {
    Box,
    Collapse,
    TableRow,
    TableCell,
    Typography,
    IconButton,
} from "@material-ui/core"

import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons/';

import ActionMenu from './ActionMenu'
import StatusIndicator from './StatusIndicators'

export default class SingleTableRow extends React.Component {
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
                <TableRow key={this.props.row.id} class="singleDeviceRow">
                    <TableCell class="tableCell dropdownButton" style={{ width: 1, padding: 0, paddingLeft: 5 }}>
                        <IconButton onClick={() => this.setState({ open: !this.state.open })}>
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </TableCell>
                    <TableCell class="tableCell">{this.props.row.name}</TableCell>
                    <TableCell class="tableCell numeric">{this.props.row.serial}</TableCell>
                    <TableCell class="tableCell">
                        {StatusIndicator(this.props)}
                    </TableCell>
                    <TableCell class="tableCell numeric">{this.props.row.ip}</TableCell>
                    <TableCell class="tableCell numeric">{this.props.row.port}</TableCell>
                    <TableCell class="tableCell" align="center">
                        <ActionMenu />
                    </TableCell>
                </TableRow>
                <TableRow class="deviceDetails">
                    <TableCell class="chevronText lightestGrey" colSpan={7}>
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