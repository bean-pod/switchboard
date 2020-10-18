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

import PropTypes from "prop-types";
import GenerateData from "./SampleData";
import generateHeadCells from "./headCells";
import ActionMenu from "./ActionMenu";
import DeviceListTabs from "./DeviceListTabs";
import * as DeviceApi from "./api/DeviceApi";

// imports for material ui & etc

// temporary row

function getStatusStyle(status) {
    if (status === 0) {
        return "green statusText";
    }
    else if (status === 1) {
        return "yellow statusText";
    }
    else if (status === 2) {
        return "red statusText";
    }
    else {
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

class TitleBox extends React.Component {
    render() {
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
}

// tabs. decide on sender or receiver table
class ContentsTable extends React.Component {
    constructor(props) {
        super(props)
        var sampleData = GenerateData();
        this.state = {
            senders: sampleData.senders,
            receivers: sampleData.receivers,
            value: 0
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSendersChange = this.handleSendersChange.bind(this);
        this.handleReceiversChange = this.handleReceiversChange.bind(this);
    }

    componentDidMount() {
        DeviceApi.getSenders(this.handleSendersChange);
        DeviceApi.getReceivers(this.handleReceiversChange);
    }

    handleValueChange(value) {
        this.setState({
            value: value
        });
    }

    handleSendersChange(senders) {
        this.setState({
            senders: senders
        });
    }

    handleReceiversChange(receivers) {
        this.setState({
            receivers: receivers
        });
    }

    render() {
        return (
            <React.Fragment>
                {DeviceListTabs(this.props.classes, [this.state.value, this.handleValueChange])}
                <TabPanel value={this.state.value} index={0}>
                    <DevicesTable rows={this.state.senders} />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <DevicesTable rows={this.state.receivers} />
                </TabPanel>
            </React.Fragment>
        );
    }
}

class SingleTableRow extends React.Component {
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
                    <TableCell style={{ width: 1, padding: 0, paddingLeft: 5 }}>
                        <IconButton onClick={() => this.setState({ open: !this.state.open })}>
                            {this.state.open ? <ExpandMore /> : <ExpandLess />}
                        </IconButton>
                    </TableCell>
                    <TableCell>{this.props.row.name}</TableCell>
                    <TableCell>{this.props.row.serial}</TableCell>
                    <TableCell>
                        <div class={getStatusStyle(this.props.row.status)}>
                            {getStatusText(this.props.row.status)}
                        </div>
                    </TableCell>
                    <TableCell>{this.props.row.ip}</TableCell>
                    <TableCell>{this.props.row.port}</TableCell>
                    <TableCell align="center">
                        <ActionMenu />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell class="chevronText lightestGrey" colSpan={7}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={2}>
                                <Typography variant="caption">
                                    Some extra info: {this.rowExtras(this.props.row.extras)}
                                </Typography>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}

class DevicesTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Box>
                    <TableContainer style={{ maxHeight: 500 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: 1, padding: 0, paddingLeft: 5 }}></TableCell>
                                    {generateHeadCells()}
                                    <TableCell align="center"><Typography variant="caption">Actions</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.rows.map((row) => {
                                    return <SingleTableRow row={row} />;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </React.Fragment>
        );
    }
}

// combine the fragments
class DeviceList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <TitleBox />
                <ContentsTable classes={this.props.classes} />
            </Container>
        );
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
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

const useStyles = (theme) => ({
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
});

export default withStyles(useStyles)(DeviceList)