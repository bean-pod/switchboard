import React from "react";
import PropTypes from "prop-types";
import LogsTable from "../loglist/LogsTable";
import * as LogApi from "../api/LogApi";

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
        title: "Sender",
        field: "encoderSerial",
        cellStyle: { width: "10%" }
      },
      {
        title: "Receiver",
        field: "decoderSerial",
        cellStyle: { width: "10%" }
      },
      {
        title: "Message",
        field: "message",
        sorting: false
      }
    ];
    this.handleStreamLogsChange = this.handleStreamLogsChange.bind(this);
  }

  componentDidMount() {
    const { streamId } = this.props;
    LogApi.getStreamLogs(streamId).then((logs) =>
      this.handleStreamLogsChange(logs)
    );
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
    const { streamId } = this.props;
    return (
      <LogsTable
        title={`${streamId} Logs`}
        logs={logs}
        columns={this.getColumnInfo()}
      />
    );
  }
}

StreamLogTableWrapper.propTypes = {
  streamId: PropTypes.number.isRequired
};
