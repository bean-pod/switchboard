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
    Typography
} from "@material-ui/core"
// imports for material ui & etc

function importData() {
    // get data from the database
}

// to combine the title box and contents
function DeviceList() {
    return (
        <Container>
            <Box class="flexContents">
                <span class="paddedText headerTitle">My Devices</span>
                <span >
                    <Button class="green buttonText" disableElevation>
                        Stream
                    </Button>
                    <Button class="blue buttonText">
                        Add Device
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
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        empty for now :)
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
}

export default DeviceList;