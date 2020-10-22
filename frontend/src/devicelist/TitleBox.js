import React from 'react';
import {
    Box,
    Button,
    Collapse,
    Container,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    TableBody,
    Typography,
    IconButton,
    withStyles
} from "@material-ui/core"

import {
    SwapHoriz,
    AddSharp,
    ExpandLess,
    ExpandMore
} from '@material-ui/icons/';

export default class TitleBox extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Box class="flexContents headerArea">
                    <div class="paddedText title">My Devices</div>
                    <div class="alignRightFloat">
                        <Button class="green buttonText">
                            <SwapHoriz /> Stream
                        </Button>
                        <Button class="blue buttonText">
                            <AddSharp /> Add Device
                        </Button>
                    </div>
                </Box>
            </React.Fragment>
        );
    }
}