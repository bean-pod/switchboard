import React from 'react';
import {
    Box,
    Container
} from "@material-ui/core"
import StreamingTable from "./StreamingTable"
import DynamicBreadcrumb from '../General/DynamicBreadcrumb';

export default class StreamTable extends React.Component {

    constructor(props) {

        super(props)
        this.dataSource = props.dataSource;
    }

    render() {
        return (
            <Container>
                <DynamicBreadcrumb
                    breadcrumbs={[["Home", ""], ["My Devices", "Devices"], ["Streaming", "Streaming"]]} />
                <Box padding="1em">
                    <Box className="flexContents headerArea">
                        <div className="title">Streaming</div>
                    </Box>
                    <StreamingTable dataSource={this.props.dataSource} />
                </Box>

            </Container>

        );
    }
}