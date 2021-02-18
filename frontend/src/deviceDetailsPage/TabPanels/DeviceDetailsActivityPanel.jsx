import { Container, Paper } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import DeviceInfo from "../../model/DeviceInfo";
import LogsTable from "../../logslist/LogsTable";
import * as LogApi from "../../api/LogApi";

export default function DeviceDetailsActivityPanel(props) {
  const [logs, setLogs] = React.useState([]);
  const { device } = props;

  React.useEffect(() => {
    LogApi.getDeviceLogs(device.serialNumber).then((retrievedLogs) => {
      setLogs(retrievedLogs);
    });
  });

  return (
    <>
      <Container component={Paper}>
        <LogsTable logs={logs} bodyHeight="35vh" />
      </Container>
    </>
  );
}

DeviceDetailsActivityPanel.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
