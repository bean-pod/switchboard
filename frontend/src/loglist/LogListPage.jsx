import React from "react";
import { Box, Container } from "@material-ui/core";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import LogsTable from "./LogsTable";
import * as LogApi from "../api/LogApi";

export default class LogListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
    this.handleLogsChange = this.handleLogsChange.bind(this);
  }

  componentDidMount() {
    LogApi.getAllLogs().then(this.handleLogsChange);
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
        <Container>
          <DynamicBreadcrumb
            breadcrumbs={[
              ["Home", "/"],
              ["Logs", "/Logs"]
            ]}
          />
          <Box className="areaUnderBreadcrumbs">
            <Box className="headerAreaUnderline">
              <div className="title">Logs</div>
            </Box>
            <LogsTable logs={logs} />
          </Box>
        </Container>
      </>
    );
  }
}
