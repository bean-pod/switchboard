import React from "react";
import PropTypes from "prop-types";
import DeviceInfo from "../model/DeviceInfo";
import LogsTable from "../loglist/LogsTable";
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
        field: "id",
        cellStyle: { width: "5%" }
      },
      {
        title: "Date",
        field: "dateTime",
        cellStyle: { width: "10%" }
      },
      {
        title: "Level",
        field: "level",
        cellStyle: { width: "10%" }
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

  getColumnInfo() {
    return this.columns;
  }

  render() {
    const { logs } = this.state;
    return <LogsTable logs={logs} columns={this.getColumnInfo()} />;
  }
}

DeviceLogTableWrapper.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
