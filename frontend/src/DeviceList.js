import React from 'react';
import {
    Box,
    Button,
    Container,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from "@material-ui/core"
// icons
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// imports for material ui & etc

// temporary row
const rows = [
    createTemp(1, "Test", "1:23:456:789", 0, "123:456", 480), // test green
    createTemp(2, "Temp 2", "1:32:456:789", 1, "132:456", 480), // test yellow
    createTemp(3, "Temp 3", "1:42:356:789", 2, "142:456", 480), // test red
    createTemp(4, "Temp 4", "1:52:356:789", 3, "152:456", 480) // test grey
];

function createTemp(id, name, mac, status, ip, port) {
    return {id, name, mac, status, ip, port};
}
function getStatusStyle(status) {
    if(status == 0) {
        return "green statusText";
    }
    else if(status == 1) {
        return "yellow statusText";
    }
    else if(status == 2) {
        return "red statusText";
    }
    else {
        return "lightGrey statusOfflineText";
    }
}
function getStatusText(status){
    if(status == 0) {
        return "Online";
    }
    else if(status == 1) {
        return "Pending";
    }
    else if(status == 2) {
        return "Error";
    }
    else {
        return "Offline";
    }
}

function importData() {
    // get data from the database
}

function DeviceList() {
    return (
        <Container>
            <Box class="flexContents headerArea">
                <span class="paddedText title">My Devices</span>
                <span class="alignRightFloat">
                    <Button class="green buttonText">
                        <SwapHorizIcon /> Stream
                    </Button>
                    <Button class="blue buttonText">
                        <AddSharpIcon /> Add Device
                    </Button>
                </span>
            </Box>
            <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>MAC Address</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>IP Address</TableCell>
                            <TableCell>Port</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) =>(
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.mac}</TableCell>
                                <TableCell>
                                    <div class={getStatusStyle(row.status)}>
                                        {getStatusText(row.status)}
                                    </div>
                                </TableCell>
                                <TableCell>{row.ip}</TableCell>
                                <TableCell>{row.port}</TableCell>
                                <TableCell align="center">
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
}

export default DeviceList;