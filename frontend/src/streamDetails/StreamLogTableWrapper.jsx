import React from "react";
import PropTypes from "prop-types";
import LogsTable from "../loglist/LogsTable";
import { snackbar } from "../general/SnackbarMessage";

export default class StreamLogTableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
    this.columns = [
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
    this.dataSource = props.dataSource;
    this.handleStreamLogsChange = this.handleStreamLogsChange.bind(this);
  }

  componentDidMount() {
    const { streamId } = this.props;
    this.dataSource
      .getStreamLogs(streamId)
      .then(this.handleStreamLogsChange)
      .catch((error) => {
        snackbar("error", `Failed to fetch stream logs: ${error.message}`);
      });
  }

  handleStreamLogsChange(logs) {
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

StreamLogTableWrapper.propTypes = {
  streamId: PropTypes.number.isRequired,
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
