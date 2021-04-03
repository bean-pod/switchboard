import React from "react";
import { Button, Grid } from "@material-ui/core";
import { getSenders, getReceivers } from "../api/DeviceApi";
import DashboardCard from "../general/dashboard/DashboardCard";
import CreateStreamDeviceCardWrapper from "./CreateStreamDeviceCardWrapper";

export default class CreateStreamPageContents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senders: [],
      receivers: [],
      senderDeviceIndex: -1,
      senderChannelIndex: -1,
      receiverDeviceIndex: -1,
      receiverChannelIndex: -1
    };

    this.setSenders = this.setSenders.bind(this);
    this.setReceivers = this.setReceivers.bind(this);
    this.setSenderDeviceIndex = this.setSenderDeviceIndex.bind(this);
    this.setReceiverDeviceIndex = this.setReceiverDeviceIndex.bind(this);
    this.setSenderChannelIndex = this.setSenderChannelIndex.bind(this);
    this.setReceiverChannelIndex = this.setReceiverChannelIndex.bind(this);
  }

  componentDidMount() {
    getSenders(this.setSenders);
    getReceivers(this.setReceivers);
  }

  setSenders(value) {
    this.setState({
      senders: value
    });
  }

  setReceivers(value) {
    this.setState({
      receivers: value
    });
  }

  setSenderDeviceIndex(value) {
    this.setState({
      senderDeviceIndex: value
    });
  }

  setReceiverDeviceIndex(value) {
    this.setState({
      receiverDeviceIndex: value
    });
  }

  setSenderChannelIndex(value) {
    this.setState({
      senderChannelIndex: value
    });
  }

  setReceiverChannelIndex(value) {
    this.setState({
      receiverChannelIndex: value
    });
  }

  render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="stretch"
        direction="row"
        spacing={3}
      >
        <Grid item xs={5}>
          <CreateStreamDeviceCardWrapper
            title="Sender"
            deviceList={senders}
            deviceIndex={senderDeviceIndex}
            setDeviceIndex={this.setSenderDeviceIndex}
            channelIndex={senderChannelIndex}
            setChannelIndex={this.setSenderChannelIndex}
          />
        </Grid>
        <Grid item xs={2}>
          {"=>"}
        </Grid>
        <Grid item xs={5}>
          receiverCard
        </Grid>
        <Grid item xs={2}>
          <Button />
        </Grid>
      </Grid>
    );
  }
}
