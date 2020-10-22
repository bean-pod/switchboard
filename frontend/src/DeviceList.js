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
import GenerateData from "./devicelist/SampleData";
import HeadCells from "./devicelist/HeadCells";
import DeviceListTabs from "./devicelist/VerticalTabs";
import * as DeviceApi from "./api/DeviceApi";
import SearchBar from './devicelist/SearchBar';
import SortBy from './devicelist/SortBy';
import SingleTableRow from './devicelist/SingleTableRow'
import TitleBox from './devicelist/TitleBox'
import DevicesTable from './devicelist/DevicesTable'
import ContentsTable from './devicelist/ContentsTable'

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