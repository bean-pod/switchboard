import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Collapse,
    Container,
    makeStyles,
    Menu,
    Tab,
    Tabs,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    TableBody,
    TableSortLabel,
    Select,
    Typography,
    IconButton,
    TextField,
    MenuItem
} from "@material-ui/core"

import {
    SwapHoriz,
    AddSharp,
    ExpandLess,
    ExpandMore,
    Search,
    MoreVert
} from '@material-ui/icons/';

import PropTypes from "prop-types";
import GenerateData from "./SampleData";
// imports for material ui & etc

// temporary row
const rows = GenerateData();

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
                        <SwapHoriz /> Stream
                    </Button>
                    <Button class="blue buttonText">
                        <AddSharp /> Add Device
                    </Button>
                </span>
            </Box>
        </React.Fragment>
    );
}

// tabs. decide on sender or receiver table
function ContentsTable() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <AppBar position="static">
                <Tabs class="lightGrey blackFont flexContents"
                    //  variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs">

                    <LinkTab label="Senders" {...a11yProps(0)} />
                    <LinkTab label="Receivers" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {DevicesTable(0)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {DevicesTable(1)}
            </TabPanel>
        </React.Fragment>
    );
}

function SingleTableRow(row) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow key={row.id}>
                <TableCell style={{ width: 1, padding: 0, paddingLeft: 5 }}>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <ExpandMore /> : <ExpandLess />}
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
                    <ActionMenu />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell class="chevronText lightestGrey" colspan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Typography variant="caption">
                                Some extra info: {rowExtras(row.extras)}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
function rowExtras(extras) {
    var extraStr = "";
    for (var i = 0; i < extras.length; i++) {
        extraStr = extraStr + extras[i] + " ";
    }
    return extraStr;
}
function ActionMenu() {
    // will need updating to function with individual devices
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>View details</MenuItem>
                <MenuItem onClick={handleClose}>Start stream with this as receiver</MenuItem>
                <MenuItem onClick={handleClose}><span class="warningText">Delete</span></MenuItem>
            </Menu>
        </React.Fragment>
    );
}

function DevicesTable() {
    var data = rows[arguments[0]];
    return (
        <React.Fragment>
            <Box>
                <TableContainer style={{ maxHeight: 500 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 1, padding: 0, paddingLeft: 5 }}></TableCell>
                                <TableCell>
                                    <Typography variant="caption">Name</Typography>
                                    <TextField variant="outlined" id="nameSearch" size="small" />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">MAC Address</Typography>
                                    <TextField variant="outlined" id="macSearch" size="small" />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">Status</Typography>
                                    <Select variant="outlined" id="statusSelect" fullWidth="true" >
                                        <MenuItem dense="true" value={"Online"}> <Typography variant="caption">Online</Typography></MenuItem>
                                        <MenuItem dense="true" value={"Pending"}> <Typography variant="caption">Pending</Typography></MenuItem>
                                        <MenuItem dense="true" value={"Error"}>   <Typography variant="caption">Error</Typography></MenuItem>
                                        <MenuItem dense="true" value={"Offline"}> <Typography variant="caption">Offline</Typography></MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">IP Address</Typography>
                                    <TextField variant="outlined" multiline="false" margin="dense" size="small" id="ipSearch" />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">Port</Typography>
                                    <TextField variant="outlined" id="portSearch" size="small" />
                                </TableCell>
                                <TableCell align="center"><Typography variant="caption">Actions</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                SingleTableRow(row)
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

export default DeviceList;