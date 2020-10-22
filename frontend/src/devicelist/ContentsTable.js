import React from 'react';
import { Box } from "@material-ui/core"

import * as DeviceApi from "../api/DeviceApi";
import GenerateData from './SampleData'
import SearchBar from './SearchBar'
import SortBy from './SortBy'
import VerticalTabs from './VerticalTabs'
import TabPanel from './TabPanel'
import DevicesTable from './DevicesTable'

export default class ContentsTable extends React.Component {
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
                <Box style={{ display: 'flex', flexGrow: 1, margin: "1em 0em" }}>
                    <SearchBar />
                    <SortBy />
                </Box>
                <Box style={{ display: 'flex', flexGrow: 1, maxHeight: 500 }}>
                    <VerticalTabs value ={this.state.value} setValue={this.handleValueChange} classes={this.props.classes} />
                    <TabPanel value={this.state.value} index={0}>
                        <DevicesTable rows={this.state.senders} />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <DevicesTable rows={this.state.receivers} />
                    </TabPanel>
                </Box>
            </React.Fragment>
        );
    }
}