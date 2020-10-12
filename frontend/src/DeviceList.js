import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Collapse,
    Container,
    makeStyles,
    Tab,
    Tabs,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
    Typography,
    IconButton
} from "@material-ui/core"

import{
    SwapHoriz,
    AddSharp,
    ExpandLess,
    ExpandMore,
    Search,
    MoreVert
} from '@material-ui/icons/';

import PropTypes from "prop-types";
// imports for material ui & etc

// temporary row
const rows = 
[
    [
    createTemp(1, "Sender 1", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // test green
    createTemp(2, "Sender 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // test yellow
    createTemp(3, "Sender 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), // test red
    createTemp(4, "Sender 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]) // test grey
    ],
    [
        createTemp(1, "Receiver 1", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // test green
        createTemp(2, "Receiver 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // test yellow
        createTemp(3, "Receiver 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), // test red
        createTemp(4, "Receiver 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]) // test grey
    ]
];
function createTemp(id, name, mac, status, ip, port, extras) {
    return {
        "id" : id,
        "name" : name,
        "mac" : mac,
        "status" : status,
        "ip" : ip,
        "port": port,
        "extras" : extras
    }
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
                <Tabs class="darkGrey" 
                 variant="fullWidth"
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
                <TableCell style={{width: 1, padding: 0, paddingLeft: 5}}>
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
                    <IconButton>
                        <MoreVert />
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
   
    var data = rows[arguments[0]];
    return (
        <React.Fragment>
            <Box>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: 1, padding: 0, paddingLeft: 5}}></TableCell>
                            <TableCell>Name
                                <br /><input type="text" id="nameSearch"/>
                            </TableCell>
                            <TableCell>MAC Address
                            <br /><input type="text" id="macSearch"/>
                            </TableCell>
                            <TableCell>Status
                            <br /><select id="statusSelect">
                                <option></option>
                                    <option>Online</option>
                                    <option>Pending</option>
                                    <option>Error</option>
                                    <option>Offline</option>
                                </select>
                            </TableCell>
                            <TableCell>IP Address
                            <br /><input type="text" id="ipSearch"/>
                            </TableCell>
                            <TableCell>Port
                            <br /><input type="text" id="portSearch"/>
                            </TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
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