import React from "react";
import { Grid } from "@material-ui/core";

import axios from "axios";

import SelectDevicesTable from "./SelectDevicesTable";
import StreamButton from "../General/Buttons/StreamButton";

export default class StreamingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: [],
      receivers: [],
      selectedSenderID: "",
      selectedReceiverID: "",
    };

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
      senders,
    });
  }

  handleReceiversChange(receivers) {
    this.setState({
      receivers,
    });
  }

  onSenderSelected(selectedSender) {
    this.setState({
      selectedSenderID: selectedSender.target.value,
    });
  }

  onReceiverSelected(selectedReceiver) {
    this.setState({
      selectedReceiverID: selectedReceiver.target.value,
    });
  }

  handleSubmit(event) {
    if (
      this.state.selectedReceiverID === "" ||
      this.state.selectedSenderID === ""
    ) {
      console.log("Please select a sender and a receiver");
    } else {
      axios
        .post("http://localhost:8080/stream", {
          inputChannelId: this.state.selectedReceiverID,
          outputChannelId: this.state.selectedSenderID,
        })
        .then((response) => {
          console.log("Success. Stream Started.");
        });
    }
    event.preventDefault();
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} id="createStreamForm">
          <Grid
            container
            spacing={2}
            alignContent="center"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={3}>
              <div className="streamingTable" id="SenderTable">
                <SelectDevicesTable
                  name="Sender Devices"
                  dataSource={this.state.senders}
                  onChange={this.onSenderSelected.bind(this)}
                />
              </div>
            </Grid>
            <Grid
              container
              item
              xs={2}
              id="TableStartStreamingBtn"
              justify="center"
              alignContent="center"
              alignItems="center"
              display="flex"
            >
              <StreamButton type="submit" />
            </Grid>
            <Grid item xs={3}>
              <div className="streamingTable" id="ReceiverTable">
                <SelectDevicesTable
                  name="Receiver Devices"
                  dataSource={this.state.receivers}
                  onChange={this.onReceiverSelected.bind(this)}
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}
