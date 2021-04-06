import React from "react";
import PropTypes from "prop-types";
import LogsTable from "../loglist/LogsTable";

export default class StreamLogsTableWrapper extends React.Component {
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
    this.dataSource = props.dataSource;
    this.handleStreamLogsChange = this.handleStreamLogsChange.bind(this);
  }

  componentDidMount() {
    const { streamId } = this.props;
    this.dataSource
      .getStreamLogs(streamId)
      .then((logs) => this.handleStreamLogsChange(logs));
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

StreamLogsTableWrapper.propTypes = {
  streamId: PropTypes.number.isRequired,
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
