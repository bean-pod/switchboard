import React from "react";
import { Button, Grid } from "@material-ui/core";
import {getSenders, getReceivers} from "../api/DeviceApi";

export default class CreateStreamPageContents extends React.Component {
  constructor(props){
    super(props);

    this.state= {
      senders: [],
      receivers: [],
      senderDeviceId: -1,
      senderChannelId: -1,
      receiverDeviceId: -1,
      receiverChannelId: -1      
    }
    this.setSenders = this.setSenders.bind(this);
    this.setReceivers = this.setReceivers.bind(this);
    this.setSenderDeviceId = this.setSenderDeviceId.bind(this);
    this.setReceiverDeviceId = this.setReceiverDeviceId.bind(this);
    this.setSenderChannelId = this.setSenderChannelId.bind(this);
    this.setReceiverChannelId = this.setReceiverChannelId.bind(this);

  }

  componentDidMount(){
    getSenders(this.setSenders);
    getReceivers(this.setReceivers);
  }
  setSenders(value){
    this.setState({
      senders: value
    })
  }
  setReceivers(value){
    this.setState({
      receivers: value
    })
  }
  setSenderDeviceId(value){
    this.setState({
      senderDeviceId: value
    })
  }
  setReceiverDeviceId(value){
    this.setState({
      receiverDeviceId: value
    })
  }
  setSenderChannelId(value){
    this.setState({
      senderChannelId: value
    })
  }
  setReceiverChannelId(value){
    this.setState({
      receiverChannelId: value
    })
  }

  render(){
    return (
      <Grid
        container
        justify="center"
        alignItems="stretch"
        direction="row"
        spacing={3}
      >
        <Grid item xs={5}>
          senderCard
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
