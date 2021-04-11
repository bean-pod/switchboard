import React from "react";
import PropTypes from "prop-types";
import StreamTable from "./StreamTable";
import { snackbar } from "../general/SnackbarMessage";

export default class StreamTableWrapper extends React.Component {
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
        snackbar("error", `Failed to fetch streams: ${error.message}`);
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
    return <StreamTable streams={streams} columns={columns} />;
  }
}

StreamTableWrapper.propTypes = {
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
