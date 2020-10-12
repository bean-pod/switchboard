import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Collapse,
    Container,
    Tab,
    Tabs,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
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
    createTemp(1, "Test", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // test green
    createTemp(2, "Temp 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // test yellow
    createTemp(3, "Temp 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), // test red
    createTemp(4, "Temp 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]) // test grey
];
function createTemp(id, name, mac, status, ip, port, extras) {
    return { id, name, mac, status, ip, port, extras };
}

function getStatusStyle(status) {
    if (status == 0) {
        return "green statusText";
    }
    else if (status == 1) {
        return "yellow statusText";
    }
    else if (status == 2) {
        return "red statusText";
    }
    else {
        return "lightGrey statusOfflineText";
    }
}
function getStatusText(status) {
    if (status == 0) {
        return "Online";
    }
    else if (status == 1) {
        return "Pending";
    }
    else if (status == 2) {
        return "Error";
    }
    else {
        return "Offline";
    }
}

function importData() {
    // get data from the database
}

function TitleBox() {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

// tabs. decide on sender or receiver table
function ContentsTable() {
    return (
        <React.Fragment>
            <AppBar position="static">
                <Tabs  aria-label="simple tabs">
                    <Tab label="Senders" />
                    <Tab label="Receivers" />
                </Tabs>
            </AppBar>
            
            <DevicesTable />

        </React.Fragment>
    );
}

function SingleTableRow(row) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow key={row.id}>
                <TableCell style={{width: 1, padding: 0, paddingLeft: 5}}>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                </TableCell>
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
            <TableRow>
                <TableCell class="chevronText lightestGrey" colspan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            Some extra info: {rowExtras(row.extras)}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
function rowExtras(extras){
    var extraStr = "";
    for(var i = 0; i < extras.length; i++) {
        extraStr = extraStr + extras[i] + " ";
    }
    return extraStr;
}

function DevicesTable() {
    return (
        <React.Fragment>
            <Box>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: 1, padding: 0, paddingLeft: 5}}></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>MAC Address</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>IP Address</TableCell>
                            <TableCell>Port</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            SingleTableRow(row)
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </React.Fragment>
    );
}

// combine the fragments
function DeviceList() {
    return (
        <Container>
            <TitleBox />
            <ContentsTable />
        </Container>
    );
}

export default DeviceList;