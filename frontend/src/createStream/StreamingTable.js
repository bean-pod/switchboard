import React from 'react';
import {
    Grid
} from "@material-ui/core"

import axios from "axios";


import SelectDevicesTable from "./SelectDevicesTable";
import StreamButton from "../General/Buttons/StreamButton";

export default class StreamingTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            senders: [],
            receivers: [],
            selectedSender: {},
            selectedSenderID: "",
            selectedReceiver: {},
            selectedReceiverID: ""
        }

        this.dataSource = props.dataSource;
        this.handleSendersChange = this.handleSendersChange.bind(this);
        this.handleReceiversChange = this.handleReceiversChange.bind(this);

        this.onSenderSelected = this.onSenderSelected.bind(this);
        this.onReceiverSelected = this.onReceiverSelected.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
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

    onSenderSelected(selectedSender) {
        var data =selectedSender.target.value.split("_");
        var sender = this.state.senders[data[0]];

        this.setState({
            selectedSender: sender,
            selectedSenderID: data[2]
        })
    }

    onReceiverSelected(selectedReceiver) {
        var data =selectedReceiver.target.value.split("_");
        var receiver = this.state.receivers[data[0]];

        this.setState({
            selectedReceiver: receiver,
            selectedReceiverID: data[2]
        })

    }

    handleSubmit(event){

        if (this.state.selectedReceiver != "" &&this.state.selectedSenderID !="" )
        {
            axios.post("http://localhost:8080/stream",{
                inputChannelId: this.state.selectedSenderID,
                outputChannelId: this.state.selectedReceiverID
            })
            .then((response)=> {
                console.log("Success" + response);
            })
            .catch((error)=> {
                console.log("Error" + error);
            })
            alert("Stream started!");
        }
        else{
            alert("Please select a sender and a receiver");
        }
       
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
<form onSubmit={this.handleSubmit} id="createStreamForm">
    
                <Grid container spacing={2} alignContent={"center"} alignItems={"center"} justify={'center'}>
                    <Grid item xs={3}>
                        <div className="streamingTable" id="SenderTable">
                            <SelectDevicesTable
                                name="Sender Devices"
                                dataSource={this.state.senders}
                                onChange={this.onSenderSelected.bind(this)} />
                        </div>
                    </Grid>
                    <Grid container item xs={2} id="TableStartStreamingBtn" justify={'center'} alignContent={"center"} alignItems={"center"} display="flex">

                        <StreamButton type="submit"/>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="streamingTable" id="ReceiverTable">
                            <SelectDevicesTable 
                            name="Receiver Devices" 
                            dataSource={this.state.receivers}
                            onChange={this.onReceiverSelected.bind(this)}/>
                        </div>
                    </Grid>
                </Grid>
</form>
            
            </React.Fragment>
        );

    }
}