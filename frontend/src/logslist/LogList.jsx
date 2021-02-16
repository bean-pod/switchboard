import React from "react";
import { Box, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import DynamicBreadcrumb from "../general/DynamicBreadcrumb";
import LogsTable from "./LogsTable";

export default class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
    this.dataSource = props.dataSource;
    this.handleLogsChange = this.handleLogsChange.bind(this);
  }

  componentDidMount() {
    this.dataSource.getAllLogs(this.handleLogsChange);
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
              ["Logs", "Logs"]
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
LogList.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};