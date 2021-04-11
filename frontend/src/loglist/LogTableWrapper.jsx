import React from "react";
import PropTypes from "prop-types";
import LogTable from "./LogTable";
import { snackbar } from "../general/SnackbarMessage";

export default class LogTableWrapper extends React.Component {
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
        defaultSort: "desc",
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
    this.logsDataSource
      .getAllLogs()
      .then(this.handleLogsChange)
      .catch((error) => {
        snackbar("error", `Failed to fetch logs: ${error.message}`);
      });
  }

  handleLogsChange(logs) {
    this.setState({
      logs
    });
  }

  render() {
    const { logs } = this.state;
    return <LogTable logs={logs} columns={this.columns} />;
  }
}

LogTableWrapper.propTypes = {
  logsDataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
