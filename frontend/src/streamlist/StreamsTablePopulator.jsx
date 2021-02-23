import React from "react";
import PropTypes from "prop-types";
import StreamsTable from "./StreamsTable";

export default class StreamsTablePopulator extends React.Component {
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
    return <StreamsTable streams={streams} />;
  }
}

StreamsTablePopulator.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
