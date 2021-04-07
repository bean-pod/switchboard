import React from "react";
import PropTypes from "prop-types";
import StreamsTable from "./StreamsTable";
import { snackbar } from "../general/SnackbarMessage";

export default class StreamsTableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: []
    };
    this.dataSource = props.dataSource;
    this.handleStreamsChange = this.handleStreamsChange.bind(this);
  }

  componentDidMount() {
    this.dataSource
      .getAllStreams()
      .then(this.handleStreamsChange)
      .catch((error) => {
        snackbar("error", `Failed to fetch stream data: ${error.message}`);
      });
  }

  handleStreamsChange(streams) {
    this.setState({
      streams
    });
  }

  render() {
    const { streams } = this.state;
    const { columns } = this.props;
    return <StreamsTable streams={streams} columns={columns} />;
  }
}

StreamsTableWrapper.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      filtering: PropTypes.bool,
      sorting: PropTypes.bool,
      render: PropTypes.func,
      align: PropTypes.string,
      export: PropTypes.bool
    })
  ).isRequired
};
