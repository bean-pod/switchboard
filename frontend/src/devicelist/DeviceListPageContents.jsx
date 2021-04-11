import React from "react";
import PropTypes from "prop-types";

import { getSenders, getReceivers } from "../api/DeviceApi";
import DeviceTableTitle from "./DeviceTableTitle";
import DevicesTable from "./DevicesTable";
import { snackbar } from "../general/SnackbarMessage";

export default class DeviceListPageContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      senders: [],
      receivers: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.getDevices = this.getDevices.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.handleSendersChange = this.handleSendersChange.bind(this);
    this.handleReceiversChange = this.handleReceiversChange.bind(this);
  }

  componentDidMount() {
    const { selectedState } = this.props;
    this.handleChange(selectedState.passedState);
    getSenders()
      .then(this.handleSendersChange)
      .catch((error) => {
        snackbar("error", `Failed to fetch senders: ${error.message}`);
      });
    getReceivers()
      .then(this.handleReceiversChange)
      .catch((error) => {
        snackbar("error", `Failed to fetch receivers: ${error.message}`);
      });
  }

  handleChange(value) {
    this.setState({
      selected: value
    });
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

  getDevices() {
    const { receivers, senders, selected } = this.state;
    switch (selected) {
      case 1:
        return senders;
      case 2:
        return receivers;
      default:
        return senders.concat(receivers);
    }
  }

  getTitle() {
    const { selected } = this.state;
    return (
      <DeviceTableTitle index={selected} handleChange={this.handleChange} />
    );
  }

  render() {
    return <DevicesTable devices={this.getDevices()} title={this.getTitle()} />;
  }
}

DeviceListPageContents.defaultProps = {
  selectedState: { passedState: 0 }
};

DeviceListPageContents.propTypes = {
  selectedState: PropTypes.shape({
    passedState: PropTypes.number
  })
};
