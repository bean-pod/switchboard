import React from "react";
import PropTypes from "prop-types";
import LogsTable from "../loglist/LogsTable";
import * as LogApi from "../api/LogApi";

export default class StreamLogsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
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

  render() {
    const { logs } = this.state;
    const { streamId } = this.props;
    return <LogsTable title={`${streamId} Logs`} logs={logs} />;
  }
}

StreamLogsWrapper.propTypes = {
  streamId: PropTypes.number.isRequired
};
