import React from "react";
import PropTypes from "prop-types";
import StreamsTable from "./StreamsTable";
import StreamsTableSimple from "./StreamsTableSimple";
import { getAllStreams } from "../api/SampleData";

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
      .catch(() => {
        this.handleStreamsChange(getAllStreams());
      });
  }

  handleStreamsChange(streams) {
    this.setState({
      streams
    });
  }

  render() {
    const { streams } = this.state;
    const { isSimple } = this.props;
    return (
      <>
        {isSimple ? 
          <StreamsTableSimple streams={streams}/> :
          <StreamsTable streams={streams} />
        }
      </>
    );
  }
}

StreamsTableWrapper.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired,
  isSimple: PropTypes.bool
};

StreamsTableWrapper.defaultProps = {
  isSimple: false
}
