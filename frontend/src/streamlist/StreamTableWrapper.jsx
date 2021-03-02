import React from "react";
import PropTypes from "prop-types";
import StreamTable from "./StreamTable";

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
    this.dataSource.getAllStreams(this.handleStreamsChange);
  }

  handleStreamsChange(streams) {
    this.setState({
      streams
    });
  }

  render() {
    const { streams } = this.state;
    return <StreamTable streams={streams} />;
  }
}

StreamTableWrapper.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
