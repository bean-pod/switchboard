import React from "react";
import PropTypes from "prop-types";
import LogsTable from "./LogsTable";

export default class LogsTableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
    this.logsDataSource = props.logsDataSource;
    this.handleLogsChange = this.handleLogsChange.bind(this);
  }

  componentDidMount() {
    this.logsDataSource.getAllLogs().then(this.handleLogsChange);
  }

  handleLogsChange(logs) {
    this.setState({
      logs
    });
  }

  render() {
    const { logs } = this.state;
    return <LogsTable logs={logs} />;
  }
}

LogsTableWrapper.propTypes = {
  logsDataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
