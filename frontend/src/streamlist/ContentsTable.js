import React from 'react';
import { Box } from "@material-ui/core"

import StreamsTable from './StreamsTable'

export default class ContentsTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            streams: []
        }
        this.dataSource = props.dataSource;
        this.handleStreamsChange = this.handleStreamsChange.bind(this);
    }

    componentDidMount() {
        this.dataSource.getStreams(this.handleStreamsChange);
    }

    handleStreamsChange(streams) {
        this.setState({
            streams: streams
        });
    }

    render() {
        return (
            <React.Fragment>
                <StreamsTable rows={this.state.streams} />
            </React.Fragment>
        );
    }
}