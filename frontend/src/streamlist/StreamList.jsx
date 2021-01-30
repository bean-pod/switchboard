import React from "react";
import {Box, Container} from "@material-ui/core";
import PropTypes from "prop-types";
import StreamsTable from "./StreamsTable";

export default class StreamList extends React.Component {
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
        const {streams} = this.state;
        return (
            <>
                <Container>
                    <Box className="headerAreaUnderline">
                        <div className="title">Current Streams</div>
                    </Box>
                    <StreamsTable streams={streams}/>
                </Container>
            </>
        );
    }
}
StreamList.propTypes = {
    dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
