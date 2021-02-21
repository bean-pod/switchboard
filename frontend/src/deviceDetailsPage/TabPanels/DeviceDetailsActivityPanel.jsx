import { Container, Paper } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import DeviceInfo from "../../model/DeviceInfo";
import LogsTable from "../../loglist/LogsTable";
import * as LogApi from "../../api/LogApi";

export default class DeviceDetailsActivityPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
    this.device = props.device;
    this.handleLogsChange = this.handleLogsChange.bind(this);
  }

  componentDidMount() {
    LogApi.getDeviceLogs(this.device.serialNumber).then(this.handleLogsChange);
  }

  handleLogsChange(logs) {
    this.setState({
      logs
    });
  }

  render() {
    const { logs } = this.state;
    return (
      <>
        <Container component={Paper}>
          <LogsTable title={`${this.device.serialNumber} Logs`} logs={logs} bodyHeight="35vh" />
        </Container>
      </>
    );
  }
}

DeviceDetailsActivityPanel.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
