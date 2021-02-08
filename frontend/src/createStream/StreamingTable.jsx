import React from "react";
import { Grid } from "@material-ui/core";

import axios from "axios";

import PropTypes from "prop-types";
import SelectDevicesTable from "./SelectDevicesTable";
import StreamButton from "../general/Buttons/StreamButton";
import SnackbarMessage from "../general/SnackbarMessage";

export default class StreamingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: [],
      receivers: [],
      selectedSenderID: "",
      selectedReceiverID: "",
      status: "",
      message: "",
      date: ""
    };

    this.dataSource = props.dataSource;
    this.handleSendersChange = this.handleSendersChange.bind(this);
    this.handleReceiversChange = this.handleReceiversChange.bind(this);

    this.onSenderSelected = this.onSenderSelected.bind(this);
    this.onReceiverSelected = this.onReceiverSelected.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSnackbarChange = this.handleSnackbarChange.bind(this);
  }

  componentDidMount() {
    this.dataSource.getSenders(this.handleSendersChange);
    this.dataSource.getReceivers(this.handleReceiversChange);
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

  handleSnackbarChange(status, message) {
    this.setState({
      status,
      message,
      date: new Date()
    });
  }

  handleSubmit(event) {
    const { selectedReceiverID, selectedSenderID } = this.state;
    if (selectedReceiverID !== "" && selectedSenderID !== "") {
      axios
        .post(process.env.REACT_APP_STREAM, {
          inputChannelId: selectedReceiverID,
          outputChannelId: selectedSenderID
        })
        .then(() => {
          // Refresh the page
          this.handleSnackbarChange(
            "success",
            `Stream successful between Sender ${selectedSenderID} and Receiver ${selectedReceiverID}!`
          );
        })
        .catch(() => {
          this.handleSnackbarChange(
            "error",
            `Stream failed between Sender ${selectedSenderID} and Receiver ${selectedReceiverID}`
          );
        });
    }
    event.preventDefault();
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
    const { receivers, senders, message, status, date } = this.state;
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
              {status ? (
                <SnackbarMessage key={date} status={status} msg={message} />
              ) : null}
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
StreamingTable.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
