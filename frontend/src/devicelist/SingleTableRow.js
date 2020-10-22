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

export default class SingleTableRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    rowExtras(extras) {
        var extraStr = "";
        for (var i = 0; i < extras.length; i++) {
            extraStr = extraStr + extras[i] + " ";
        }
        return extraStr;
    }

    render() {
        return (
            <React.Fragment>
                <TableRow key={this.props.row.id}>
                    <TableCell class="tableCell" style={{ width: 1, padding: 0, paddingLeft: 5 }}>
                        <IconButton onClick={() => this.setState({ open: !this.state.open })}>
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </TableCell>
                    <TableCell class="tableCell">{this.props.row.name}</TableCell>
                    <TableCell class="tableCell numeric">{this.props.row.serial}</TableCell>
                    <TableCell class="tableCell">
                        <div class={getStatusStyle(this.props.row.status)}>
                            {getStatusText(this.props.row.status)}
                        </div>
                    </TableCell>
                    <TableCell class="tableCell numeric">{this.props.row.ip}</TableCell>
                    <TableCell class="tableCell numeric">{this.props.row.port}</TableCell>
                    <TableCell class="tableCell" align="center">
                        <ActionMenu />
                    </TableCell>
                </TableRow>
                <TableRow>
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


function getStatusStyle(status) {
    switch (status) {
        case 0:
            return "green statusText";
        case 1:
            return "yellow statusText";
        case 2:
            return "red statusText";
        default:
            return "lightGrey statusOfflineText";
    }
}

function getStatusText(status) {
    switch (status) {
        case 0:
            return "Online";
        case 1:
            return "Pending";
        case 2:
            return "Error";
        default:
            return "Offline";
    }
}