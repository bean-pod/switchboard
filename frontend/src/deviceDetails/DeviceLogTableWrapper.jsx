import React from "react";
import PropTypes from "prop-types";
import DeviceInfo from "../model/DeviceInfo";
import LogTable from "../loglist/LogTable";
import { snackbar } from "../general/SnackbarMessage";

export default class DeviceLogTableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
    this.columns = [
      {
        title: "ID",
        field: "id"
      },
      {
        title: "Date",
        field: "dateTime",
        defaultSort: "desc"
      },
      {
        title: "Level",
        field: "level"
      },
      {
        title: "Message",
        field: "message",
        sorting: false
      }
    ];
    this.dataSource = props.dataSource;
    this.handleDeviceLogsChange = this.handleDeviceLogsChange.bind(this);
  }

  componentDidMount() {
    const { device } = this.props;
    this.dataSource
      .getDeviceLogs(device.serialNumber)
      .then(this.handleDeviceLogsChange)
      .catch((error) => {
        snackbar("error", `Failed to fetch device logs: ${error.message}`);
      });
  }

  handleDeviceLogsChange(logs) {
    this.setState({
      logs
    });
  }

  render() {
    const { logs } = this.state;
    return <LogTable logs={logs} columns={this.columns} />;
  }
}

DeviceLogTableWrapper.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
