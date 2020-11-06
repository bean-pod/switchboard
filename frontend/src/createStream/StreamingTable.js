import React from 'react';
import {
    Grid
} from "@material-ui/core"


import SelectDevicesTable from "./SelectDevicesTable";
import StreamButton from "../General/Buttons/StreamButton";

export default class StreamingTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            senders: [],
            receivers: []
        }
        this.dataSource = props.dataSource;
        this.handleSendersChange = this.handleSendersChange.bind(this);
        this.handleReceiversChange = this.handleReceiversChange.bind(this);

    }

    componentDidMount() {
        this.dataSource.getSenders(this.handleSendersChange);
        this.dataSource.getReceivers(this.handleReceiversChange);
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

                <Grid container spacing={2} alignContent={"center"} alignItems={"center"} justify={'center'}>
                    <Grid item xs={3}>
                        <div className="streamingTable" id="SenderTable">
                            <SelectDevicesTable  name="Sender Devices" dataSource={this.state.senders} />
                        </div>
                    </Grid>
                    <Grid container item xs={2} id="TableStartStreamingBtn" justify={'center'} alignContent={"center"} alignItems={"center"} display="flex">
                        <StreamButton />
                    </Grid>
                    <Grid item xs={3}>
                        <div className="streamingTable" id="ReceiverTable">
                            <SelectDevicesTable  name="Receiver Devices" dataSource={this.state.receivers} />
                        </div>
                    </Grid>
                </Grid>

            </React.Fragment>
        );

    }
}