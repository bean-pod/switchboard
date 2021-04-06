import React from "react";
import PropTypes from "prop-types";
import DeviceInfo from "../model/DeviceInfo";
import LogsTable from "../loglist/LogsTable";
import * as LogApi from "../api/LogApi";

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
        cellStyle: { width: "10%" }
      },
      {
        title: "Date",
        field: "dateTime",
        cellStyle: { width: "15%" }
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
    this.device = props.device;
    this.handleLogsChange = this.handleLogsChange.bind(this);
  }

  componentDidMount() {
    LogApi.getDeviceLogs(this.device.serialNumber).then((logs) =>
      this.handleLogsChange(logs)
    );
  }

  handleLogsChange(logs) {
    this.setState({
      logs
    });
  }

  getColumnInfo() {
    return this.columns;
  }

  render() {
    const { logs } = this.state;
    return (
      <LogsTable
        title={`${this.device.name} Logs`}
        logs={logs}
        columns={this.getColumnInfo()}
      />
    );
  }
}

DeviceLogTableWrapper.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
