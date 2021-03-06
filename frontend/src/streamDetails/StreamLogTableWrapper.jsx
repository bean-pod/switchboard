import React from "react";
import PropTypes from "prop-types";
import LogTable from "../loglist/LogTable";
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
        defaultSort: "desc"
      },
      {
        title: "Level",
        field: "level"
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

  render() {
    const { logs } = this.state;
    return <LogTable logs={logs} columns={this.columns} />;
  }
}

StreamLogTableWrapper.propTypes = {
  streamId: PropTypes.number.isRequired,
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
