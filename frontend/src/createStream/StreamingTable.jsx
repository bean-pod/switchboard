import React from "react";
import { Grid } from "@material-ui/core";

import SelectDevicesTable from "./SelectDevicesTable";
import StreamButton from "../general/Buttons/StreamButton";

import * as deviceApi from "../api/DeviceApi";
import { createStream } from "../api/StreamApi";

export default class StreamingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: [],
      receivers: [],
      selectedSenderID: "",
      selectedReceiverID: ""
    };

    this.handleSendersChange = this.handleSendersChange.bind(this);
    this.handleReceiversChange = this.handleReceiversChange.bind(this);

    this.onSenderSelected = this.onSenderSelected.bind(this);
    this.onReceiverSelected = this.onReceiverSelected.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    deviceApi.getSenders(this.handleSendersChange);
    deviceApi.getReceivers(this.handleReceiversChange);
  }

  handleSendersChange(senders) {
    this.setState({
      senders
    });
  }

  handleReceiversChange(receivers) {
    this.setState({
      receivers
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { selectedReceiverID, selectedSenderID } = this.state;
    if (selectedReceiverID !== "" && selectedSenderID !== "") {
      createStream(selectedReceiverID, selectedSenderID);
    }
  }

  onSenderSelected(selectedSender) {
    this.setState({
      selectedSenderID: selectedSender.target.value
    });
  }

  onReceiverSelected(selectedReceiver) {
    this.setState({
      selectedReceiverID: selectedReceiver.target.value
    });
  }

  render() {
    const { receivers, senders } = this.state;
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
                  dataSource={senders}
                  onChange={this.onSenderSelected}
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
              <StreamButton id="StreamingStreamBtn" type="submit" />
            </Grid>
            <Grid item xs={3}>
              <div className="streamingTable" id="ReceiverTable">
                <SelectDevicesTable
                  name="Receiver Devices"
                  dataSource={receivers}
                  onChange={this.onReceiverSelected}
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}
