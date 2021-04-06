import React from "react";
import PropTypes from "prop-types";
import LogsTable from "./LogsTable";

export default class LogsTableWrapper extends React.Component {
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

  getColumnInfo() {
    return this.columns;
  }

  render() {
    const { logs } = this.state;
    return <LogsTable logs={logs} columns={this.getColumnInfo()} />;
  }
}

LogsTableWrapper.propTypes = {
  logsDataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
